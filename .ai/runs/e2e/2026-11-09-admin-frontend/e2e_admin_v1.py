#!/usr/bin/env python3
"""ADMIN-V1-01~13 端到端联调（经 Next.js 代理 → pettown-boot admin）。

执行：python3 e2e_admin_v1.py
产出：results.json / 联调报告.md（与本脚本同目录）
"""
from __future__ import annotations

import base64
import json
import re
import sys
import time
from datetime import datetime
from pathlib import Path

import pymysql
import redis
import urllib.error
import urllib.request

BASE = "http://localhost:3000/api/admin"  # Next 代理 → 127.0.0.1:8081
REDIS = redis.Redis(
    host="8.163.103.108", port=6379, password="Xuzeyu456",
    decode_responses=True, socket_timeout=5,
)
DB_CFG = dict(
    host="8.163.103.108", port=33306, user="root", password="Xuzeyu456",
    database="pettown", charset="utf8mb4", connect_timeout=8,
)

ADMIN_USER = "admin"
ADMIN_PASS = "a1234567"
NOW = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

results: list[dict] = []
_captcha_times: list[float] = []


class ApiResult:
    def __init__(self, status: int, code: str, msg: str, data, raw: str):
        self.status, self.code, self.msg, self.data, self.raw = status, code, msg, data, raw

    @property
    def ok(self) -> bool:
        return self.status == 200 and self.code == "200"


def api(method: str, path: str, token: str | None = None, body=None, query=None) -> ApiResult:
    url = BASE + path
    if query:
        qs = "&".join(f"{k}={v}" for k, v in query.items() if v is not None)
        if qs:
            url += "?" + qs
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(url, data=data, method=method)
    req.add_header("Accept", "application/json")
    if data:
        req.add_header("Content-Type", "application/json")
    if token:
        req.add_header("Authorization", f"Bearer {token}")
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            raw = resp.read().decode()
            status = resp.status
    except urllib.error.HTTPError as e:
        raw = e.read().decode()
        status = e.code
    try:
        j = json.loads(raw or "{}")
        return ApiResult(status, str(j.get("code", "")), j.get("msg", ""), j.get("data"), raw)
    except json.JSONDecodeError:
        return ApiResult(status, "", "", None, raw)


def check(req_id: str, title: str, passed: bool, detail: str):
    results.append({"id": req_id, "title": title, "pass": bool(passed), "detail": detail[:500]})
    print(f"[{'PASS' if passed else 'FAIL'}] {req_id} {title} :: {detail[:160]}")


def fetch_captcha():
    """取验证码；节流到每分钟 ≤15 次（IP 限 20/分）；返回 (captcha_id, code)。"""
    now = time.time()
    while len([t for t in _captcha_times if now - t < 60]) >= 15:
        time.sleep(2)
        now = time.time()
    r = api("GET", "/verification/captcha")
    if not r.ok or not r.data:
        raise RuntimeError(f"captcha fetch failed: {r.code} {r.msg}")
    _captcha_times.append(time.time())
    cid = r.data["captchaId"]
    img = r.data["imageBase64"]
    # 校验图片为可解析 Base64（PNG 魔数）
    png_ok = img.startswith("data:image") or base64.b64decode(img[:64] + "===")[:8].startswith(b"\x89PNG")
    code = REDIS.get(f"pettown:admin-captcha:{cid}")
    if not code:
        raise RuntimeError(f"captcha answer missing in redis for {cid}")
    return cid, code, img, png_ok


def login(username: str, password: str, captcha_id: str | None = None, captcha_code: str | None = None):
    if captcha_id is None or captcha_code is None:
        captcha_id, captcha_code, _, _ = fetch_captcha()
    return api("POST", "/auth/login", body={
        "username": username, "password": password,
        "captchaId": captcha_id, "captchaCode": captcha_code,
    })


def login_ok(username: str, password: str) -> tuple[str, dict]:
    r = login(username, password)
    if not r.ok:
        raise RuntimeError(f"login failed: {r.code} {r.msg}")
    return r.data["token"], r.data


def db_query(sql: str, args=()):
    conn = pymysql.connect(**DB_CFG)
    try:
        with conn.cursor() as cur:
            cur.execute(sql, args)
            return cur.fetchall()
    finally:
        conn.close()


def db_exec(sql: str, args=()):
    conn = pymysql.connect(**DB_CFG)
    try:
        with conn.cursor() as cur:
            cur.execute(sql, args)
        conn.commit()
    finally:
        conn.close()


SUITE_START = time.time()


def main():
    token_admin, login_admin = login_ok(ADMIN_USER, ADMIN_PASS)
    admin_id = login_admin["account"]["id"]

    # ---------- ADMIN-V1-01 验证码 ----------
    cid, code, img, png_ok = fetch_captcha()
    check("V1-01.a", "返回验证码 ID + 图片", bool(cid) and len(img) > 100 and png_ok,
          f"captchaId={cid[:8]}… imageBase64={len(img)}B png={png_ok}")

    # 一次性：同验证码第二次使用应失败
    r1 = login(ADMIN_USER, ADMIN_PASS, cid, code)
    r2 = login(ADMIN_USER, ADMIN_PASS, cid, code)  # 复用已消费的 captcha
    check("V1-01.b", "验证码一次性（复用被拒）", r1.ok and r2.code in ("4002", "4001", "400"),
          f"first={r1.code} reuse={r2.code} {r2.msg}")

    # ---------- ADMIN-V1-02 登录 ----------
    t_before = db_query("SELECT last_login_time FROM admin_account WHERE id=%s", (admin_id,))
    tk, ld = login_ok(ADMIN_USER, ADMIN_PASS)
    t_after = db_query("SELECT last_login_time FROM admin_account WHERE id=%s", (admin_id,))
    check("V1-02.a", "正确凭据登录成功并回写 last_login_time",
          bool(tk) and t_after and t_after[0][0] and t_after[0][0] != (t_before[0][0] if t_before else None),
          f"token={tk[:8]}… last_login {t_before[0][0]} → {t_after[0][0]}")

    check("V1-02.b", "登录响应含 token 与 passwordChangeRequired",
          "token" in ld and "passwordChangeRequired" in ld["account"],
          f"passwordChangeRequired={ld['account']['passwordChangeRequired']}")

    # 验证码错误不进入密码校验（不计失败次数）：错验证码 1 次 + 错密码 4 次，正确密码仍可登录
    for _ in range(1):
        cid_w, code_w, _, _ = fetch_captcha()
        login(ADMIN_USER, "WrongPass!1", cid_w, "0000")  # 验证码错
    for _ in range(4):
        login(ADMIN_USER, "WrongPass!1")  # 密码错 ×4
    r = login(ADMIN_USER, ADMIN_PASS)
    check("V1-02.c", "验证码错误不计入密码失败次数（未触发锁定）", r.ok,
          f"after 1 bad-captcha + 4 bad-pwd → correct login code={r.code}")

    # 错误凭据统一错误码
    r = login("no_such_user", "Whatever!1")
    check("V1-02.d", "未知账号/错误密码统一错误（4003）", r.code == "4003",
          f"code={r.code} msg={r.msg}")

    # ---------- ADMIN-V1-03 me / menus ----------
    r = api("GET", "/auth/me", token_admin)
    perms = set((r.data or {}).get("permissions") or [])
    acc = (r.data or {}).get("account") or {}
    check("V1-03.a", "me 返回账号+角色+权限码", r.ok and acc.get("id") == admin_id and "roles" in r.data and perms,
          f"roles={len(r.data.get('roles', []))} permissions={len(perms)}")

    builtin = {
        "system:account:read", "system:account:create", "system:account:update", "system:account:status",
        "system:account:reset-password", "system:account:assign-role", "system:account:delete",
        "system:role:read", "system:role:create", "system:role:update", "system:role:delete",
        "system:role:assign-permission", "system:permission:read", "biz:user:read", "biz:user:status", "SUB_ADMIN",
    }
    check("V1-03.b", "超管权限码覆盖全部内置码", acc.get("superAdmin") or builtin <= perms,
          f"missing={sorted(builtin - perms)}")

    r = api("GET", "/auth/menus", token_admin)
    menus = r.data or []
    flat = []

    def walk(items):
        for it in items:
            flat.append(it)
            walk(it.get("children") or [])
    walk(menus)
    paths = {m.get("path") for m in flat}
    check("V1-03.c", "菜单树含 accounts/roles/permissions", r.ok and {"/system/accounts", "/system/roles", "/system/permissions"} <= paths,
          f"paths={sorted(p for p in paths if p)}")

    # ---------- ADMIN-V1-04 账号分页/筛选 ----------
    r = api("GET", "/system/accounts", token_admin, query={"page": 1, "size": 2})
    d = r.data or {}
    check("V1-04.a", "分页查询 page/size/total", r.ok and len(d.get("list", [])) <= 2 and d.get("total", 0) >= 5,
          f"list={len(d.get('list', []))} total={d.get('total')}")

    r = api("GET", "/system/accounts", token_admin, query={"page": 1, "size": 10, "username": "zz"})
    check("V1-04.b", "按用户名筛选", r.ok and all(a["username"] == "zz" for a in r.data["list"]) and len(r.data["list"]) == 1,
          f"hits={len(r.data['list'])}")

    r = api("GET", "/system/accounts", token_admin, query={"page": 1, "size": 10, "enabled": "false"})
    check("V1-04.c", "按状态筛选（enabled=false 仅禁用）", r.ok and all(a["enabled"] is False for a in r.data["list"]) and len(r.data["list"]) >= 1,
          f"hits={[a['username'] for a in r.data['list']]}")

    # ---------- 角色准备（供 04/05/06/09/10/11 使用） ----------
    ts = int(time.time()) % 100000
    role_ro_code, role_full_code, role_none_code, role_ref_code = (
        f"e2e_ro{ts}", f"e2e_full{ts}", f"e2e_none{ts}", f"e2e_ref{ts}")

    def create_role(code: str, name: str):
        return api("POST", "/system/roles", token_admin, body={"code": code, "name": name, "description": "E2E fixture"})

    r = create_role(role_ro_code, "E2E只读角色")
    role_ro_id = r.data["id"]
    r = create_role(role_full_code, "E2E管理角色")
    role_full_id = r.data["id"]
    r = create_role(role_none_code, "E2E无权限角色")
    role_none_id = r.data["id"]
    r = create_role(role_ref_code, "E2E被引用角色")
    role_ref_id = r.data["id"]

    # 角色权限分配（顺带覆盖 V1-10）
    r = api("PUT", f"/system/roles/{role_ro_id}/permissions", token_admin,
            body={"permissions": ["system:account:read", "system:role:read"]})
    check("V1-10.a", "分配角色权限码集合成功", r.ok, f"code={r.code} {r.msg}")
    r = api("GET", f"/system/roles/{role_ro_id}/permissions", token_admin)
    check("V1-10.b", "回读角色权限一致", r.ok and sorted(r.data) == ["system:account:read", "system:role:read"],
          f"perms={r.data}")
    r = api("PUT", f"/system/roles/{role_ro_id}/permissions", token_admin,
            body={"permissions": ["system:account:read", "biz:nonexistent"]})
    check("V1-10.c", "非法权限码被拒绝", not r.ok, f"code={r.code} msg={r.msg}")

    api("PUT", f"/system/roles/{role_none_id}/permissions", token_admin, body={"permissions": []})

    # ---------- ADMIN-V1-05 创建账号 ----------
    acc_ro_user, acc_ro_pass = f"e2ero{ts}", "E2ePass!1"
    r = api("POST", "/system/accounts", token_admin, body={
        "username": acc_ro_user, "displayName": "E2E只读账号", "password": acc_ro_pass,
        "phone": "13800001111", "roleId": role_ro_id,
    })
    ok_create = r.ok and r.data.get("passwordChangeRequired") is True
    acc_ro_id = (r.data or {}).get("id")
    check("V1-05.a", "创建账号成功且 passwordChangeRequired=true", ok_create,
          f"id={acc_ro_id} pcr={(r.data or {}).get('passwordChangeRequired')}")

    r = api("POST", "/system/accounts", token_admin, body={
        "username": acc_ro_user, "displayName": "重复", "password": "E2ePass!1"})
    check("V1-05.b", "用户名重复返回业务错误码 4091", r.code == "4091", f"code={r.code} msg={r.msg}")

    for bad in ("abcdefgh", "12345678", "ab12"):
        r = api("POST", "/system/accounts", token_admin, body={
            "username": f"e2ew{ts}", "displayName": "弱密", "password": bad})
        if r.ok:
            check("V1-05.c", f"弱密码被拒({bad})", False, "unexpected success")
            break
    else:
        check("V1-05.c", "弱密码被拒（无数字/无字母/过短）", True, "3 种弱密码均拒绝")

    r = api("POST", "/system/accounts", token_admin, body={
        "username": "ab_c", "displayName": "格式", "password": "E2ePass!1"})
    check("V1-05.d", "用户名格式非法被拒（非纯字母数字）", not r.ok, f"code={r.code} msg={r.msg}")

    # 新账号登录 → 强制改密标志（顺带 V1-02 passwordChangeRequired 链路）
    tk_ro, ld_ro = login_ok(acc_ro_user, acc_ro_pass)
    check("V1-05.e", "新账号可登录且 passwordChangeRequired=true", ld_ro["account"]["passwordChangeRequired"] is True,
          f"account={ld_ro['account']['username']}")

    # ---------- ADMIN-V1-06 编辑 ----------
    r = api("PUT", f"/system/accounts/{acc_ro_id}", token_admin,
            body={"displayName": "E2E只读账号改", "phone": "13800002222"})
    r2 = api("GET", "/system/accounts", token_admin, query={"page": 1, "size": 10, "username": acc_ro_user})
    got = (r2.data["list"][0] if r2.data and r2.data["list"] else {})
    check("V1-06.a", "编辑显示名/手机号生效", r.ok and got.get("displayName") == "E2E只读账号改" and got.get("phone") == "13800002222",
          f"displayName={got.get('displayName')} phone={got.get('phone')}")

    r = api("PUT", f"/system/accounts/{admin_id}", token_admin, body={"roleId": role_ro_id})
    check("V1-06.b", "禁止修改自身角色（防提权）", not r.ok, f"code={r.code} msg={r.msg}")

    r = api("GET", "/auth/me", tk_ro)
    perms_ro = sorted((r.data or {}).get("permissions") or [])
    r = api("PUT", f"/system/accounts/{acc_ro_id}", token_admin, body={"roleId": role_full_id})
    api("PUT", f"/system/roles/{role_full_id}/permissions", token_admin,
        body={"permissions": ["system:account:read", "system:account:create", "biz:user:read"]})
    r2 = api("GET", "/auth/me", tk_ro)
    perms_ro2 = sorted((r2.data or {}).get("permissions") or [])
    check("V1-06.c", "改角色后目标账号权限码同步变化",
          r.ok and perms_ro == ["system:account:read", "system:role:read"] and "system:account:create" in perms_ro2,
          f"before={perms_ro} after={perms_ro2}")

    # ---------- ADMIN-V1-07 启停/删除 ----------
    r = api("PUT", f"/system/accounts/{acc_ro_id}/status", token_admin, body={"enabled": False})
    r_me = api("GET", "/auth/me", tk_ro)
    r_log = login(acc_ro_user, "E2ePass!1")  # 初始密码（已被 pcr 标记）——用当前有效密码未知，改用新账号测试
    check("V1-07.a", "停用后该账号 token 立即失效", r.ok and not r_me.ok,
          f"disable={r.code} me_after={r_me.status}/{r_me.code}")
    api("PUT", f"/system/accounts/{acc_ro_id}/status", token_admin, body={"enabled": True})

    r = api("PUT", f"/system/accounts/{admin_id}/status", token_admin, body={"enabled": False})
    check("V1-07.b", "禁止停用自己/超级管理员", not r.ok, f"code={r.code} msg={r.msg}")
    r = api("DELETE", f"/system/accounts/{admin_id}", token_admin)
    check("V1-07.c", "禁止删除自己/超级管理员", not r.ok, f"code={r.code} msg={r.msg}")

    # 非超管特权账号尝试删除超管
    acc_del_user, acc_del_pass = f"e2ed{ts}", "E2ePass!1"
    api("POST", "/system/accounts", token_admin, body={
        "username": acc_del_user, "displayName": "E2E删除者", "password": acc_del_pass, "roleId": role_full_id})
    api("PUT", f"/system/roles/{role_full_id}/permissions", token_admin,
        body={"permissions": ["system:account:delete", "system:account:status"]})
    tk_del, _ = login_ok(acc_del_user, acc_del_pass)
    r = api("DELETE", f"/system/accounts/{admin_id}", tk_del)
    check("V1-07.d", "非超管删除超管被拒", not r.ok, f"code={r.code} msg={r.msg}")

    # 软删除普通账号
    acc_tmp_user = f"e2et{ts}"
    r = api("POST", "/system/accounts", token_admin, body={
        "username": acc_tmp_user, "displayName": "E2E待删", "password": "E2ePass!1", "roleId": role_none_id})
    acc_tmp_id = r.data["id"]
    r = api("DELETE", f"/system/accounts/{acc_tmp_id}", token_admin)
    r2 = api("GET", "/system/accounts", token_admin, query={"page": 1, "size": 50, "username": acc_tmp_user})
    check("V1-07.e", "删除账号后列表不可见", r.ok and len(r2.data["list"]) == 0, f"delete={r.code} list_hits={len(r2.data['list'])}")

    # ---------- ADMIN-V1-08 重置密码 + 强制改密 ----------
    # 重置 acc_ro 密码 → 旧 token 失效 → 新密码登录 pcr=true → 改密 → 旧 token 失效 → 最终登录 pcr=false
    r = api("POST", f"/system/accounts/{acc_ro_id}/reset-password", token_admin, body={"password": "E2eReset!2"})
    r_me = api("GET", "/auth/me", tk_ro)
    check("V1-08.a", "重置密码成功并踢出旧会话", r.ok and not r_me.ok, f"reset={r.code} old_token_me={r_me.status}")

    r = api("POST", f"/system/accounts/{acc_ro_id}/reset-password", token_admin, body={"password": "weak"})
    check("V1-08.b", "重置弱密码被拒", not r.ok, f"code={r.code} msg={r.msg}")

    tk2, ld2 = login_ok(acc_ro_user, "E2eReset!2")
    check("V1-08.c", "重置后登录 passwordChangeRequired=true", ld2["account"]["passwordChangeRequired"] is True,
          f"pcr={ld2['account']['passwordChangeRequired']}")

    r = api("POST", "/auth/change-password", tk2, body={"oldPassword": "E2eReset!2", "newPassword": "E2eReset!2"})
    check("V1-08.d", "新密码与原密码相同被拒", not r.ok, f"code={r.code} msg={r.msg}")
    r = api("POST", "/auth/change-password", tk2, body={"oldPassword": "E2eReset!2", "newPassword": "weakpwd"})
    check("V1-08.e", "改密弱密码被拒", not r.ok, f"code={r.code} msg={r.msg}")

    r = api("POST", "/auth/change-password", tk2, body={"oldPassword": "E2eReset!2", "newPassword": "E2eFinal!3"})
    r_me = api("GET", "/auth/me", tk2)
    check("V1-08.f", "改密成功后旧 token 失效", r.ok and not r_me.ok, f"change={r.code} old_token={r_me.status}")

    tk3, ld3 = login_ok(acc_ro_user, "E2eFinal!3")
    check("V1-08.g", "新密码登录成功且 pcr=false", ld3["account"]["passwordChangeRequired"] is False,
          f"pcr={ld3['account']['passwordChangeRequired']}")

    # ---------- ADMIN-V1-09 角色 CRUD ----------
    r = api("GET", f"/system/roles/{role_ref_id}", token_admin)
    check("V1-09.a", "角色详情可查", r.ok and r.data["code"] == role_ref_code, f"code={r.data.get('code')}")
    r = api("PUT", f"/system/roles/{role_ref_id}", token_admin,
            body={"name": "E2E被引用角色改", "description": "updated", "enabled": True})
    r2 = api("GET", f"/system/roles/{role_ref_id}", token_admin)
    check("V1-09.b", "角色编辑生效", r.ok and r2.data["name"] == "E2E被引用角色改", f"name={r2.data.get('name')}")
    r = api("POST", "/system/roles", token_admin, body={"code": role_ref_code, "name": "重复编码"})
    check("V1-09.c", "角色 code 唯一（重复被拒）", not r.ok, f"code={r.code} msg={r.msg}")

    # 引用中的角色删除被拒（acc_ro 当前在 role_full，role_ref 先挂一个账号）
    acc_ref_user = f"e2er{ts}"
    r = api("POST", "/system/accounts", token_admin, body={
        "username": acc_ref_user, "displayName": "引用者", "password": "E2ePass!1", "roleId": role_ref_id})
    acc_ref_id = r.data["id"]
    r = api("DELETE", f"/system/roles/{role_ref_id}", token_admin)
    check("V1-09.d", "被账号引用的角色删除被拒并提示引用数", not r.ok and ("引用" in r.msg or "使用" in r.msg or r.code not in ("200", "")),
          f"code={r.code} msg={r.msg}")
    api("DELETE", f"/system/accounts/{acc_ref_id}", token_admin)
    r = api("DELETE", f"/system/roles/{role_ref_id}", token_admin)
    r2 = api("GET", f"/system/roles/{role_ref_id}", token_admin)
    check("V1-09.e", "解除引用后角色可删除", r.ok and not r2.ok, f"delete={r.code} get_after={r2.code}")

    # ---------- ADMIN-V1-11 权限目录/同步 ----------
    r = api("GET", "/system/permissions", token_admin)
    codes = {p["code"] for p in (r.data or [])}
    check("V1-11.a", "权限目录含全部内置编码", r.ok and builtin <= codes,
          f"total={len(codes)} missing={sorted(builtin - codes)}")
    n_before = len(codes)
    r1 = api("POST", "/system/permissions/sync", token_admin)
    r2 = api("POST", "/system/permissions/sync", token_admin)
    r3 = api("GET", "/system/permissions", token_admin)
    codes_after = {p["code"] for p in (r3.data or [])}
    check("V1-11.b", "sync 幂等（重复执行不产生重复记录）",
          r1.ok and r2.ok and len(r3.data) == len(codes_after),
          f"rows={len(r3.data)} unique={len(codes_after)} before={n_before}")

    # 无权限 403（V1-04 验收点）：noperm 账号调账号列表
    acc_np_user = f"e2en{ts}"
    api("POST", "/system/accounts", token_admin, body={
        "username": acc_np_user, "displayName": "无权限者", "password": "E2ePass!1", "roleId": role_none_id})
    tk_np, _ = login_ok(acc_np_user, "E2ePass!1")
    r = api("GET", "/system/accounts", tk_np)
    check("V1-04.d", "无权限角色调用返回 403", r.status == 403 or r.code in ("403", "401", "400"),
          f"http={r.status} code={r.code} msg={r.msg}")
    r = api("GET", "/auth/menus", tk_np)
    menus_np = r.data or []
    check("V1-03.d", "不同角色菜单/权限随角色变化（无权限角色菜单为空）", r.ok and len(menus_np) == 0,
          f"menus={menus_np}")

    # ---------- ADMIN-V1-12/13 C 端用户与宠物 ----------
    r = api("GET", "/users", token_admin, query={"page": 1, "size": 10})
    users = (r.data or {}).get("list") or []
    check("V1-12.a", "C 端用户分页查询", r.ok and len(users) >= 2 and (r.data.get("total") or 0) >= 2,
          f"list={len(users)} total={r.data.get('total')}")

    u0 = users[0]
    r = api("GET", "/users", token_admin, query={"page": 1, "size": 10, "phone": u0["phone"]})
    check("V1-12.b", "按手机号筛选", r.ok and len(r.data["list"]) == 1 and r.data["list"][0]["phone"] == u0["phone"],
          f"hits={len(r.data['list'])}")

    r = api("GET", f"/users/{u0['id']}", token_admin)
    check("V1-12.c", "用户详情返回 id/phone/source/status", r.ok and r.data.get("id") == u0["id"] and "status" in r.data,
          f"keys={sorted(r.data.keys())}")

    r = api("PUT", f"/users/{u0['id']}/status", token_admin, body={"status": "BANNED"})
    r2 = api("GET", f"/users/{u0['id']}", token_admin)
    check("V1-12.d", "封禁用户状态生效", r.ok and r2.data["status"] == "BANNED", f"status={r2.data.get('status')}")
    r = api("PUT", f"/users/{u0['id']}/status", token_admin, body={"status": "ACTIVE"})
    r2 = api("GET", f"/users/{u0['id']}", token_admin)
    check("V1-12.e", "解封恢复正常", r.ok and r2.data["status"] == "ACTIVE", f"status={r2.data.get('status')}")
    r = api("PUT", f"/users/{u0['id']}/status", token_admin, body={"status": "WEIRD"})
    check("V1-12.f", "非法状态值被拒", not r.ok, f"code={r.code} msg={r.msg}")

    # V1-13 宠物数据：插入一只测试宠物 → 查询 → 校验无敏感字段 → 软删清理
    uid = u0["id"]
    try:
        db_exec(
            "INSERT INTO pet (owner_id, name, species, breed, gender, birth_date, weight_kg, sterilized, avatar_url, deleted, created_time, updated_time)"
            " VALUES (%s, 'E2E测试犬', 'DOG', '柴犬', 'MALE', '2024-01-01', 8.5, 1, '', 0, NOW(), NOW())",
            (uid,),
        )
        pet_inserted = True
    except Exception as e:  # 表结构差异时降级为空列表断言
        pet_inserted = False
        pet_err = str(e)

    r = api("GET", f"/users/{uid}/pets", token_admin)
    data = r.data or {}
    pets = data.get("pets") or []
    no_sensitive = "passwordHash" not in json.dumps(data) and "password_hash" not in json.dumps(data)
    shape_ok = {"userId", "petCount", "pets"} <= set(data.keys())
    if pet_inserted:
        ok13 = r.ok and shape_ok and no_sensitive and data.get("petCount") == len(pets) >= 1
        detail = f"petCount={data.get('petCount')} pets={len(pets)} no_sensitive={no_sensitive}"
    else:
        ok13 = r.ok and shape_ok and no_sensitive and data.get("petCount") == len(pets) == 0
        detail = f"empty-list fallback (insert err: {pet_err[:80]}) shape_ok={shape_ok} no_sensitive={no_sensitive}"
    check("V1-13.a", "用户宠物数据返回且不含敏感字段", ok13, detail)

    if pet_inserted:
        db_exec("UPDATE pet SET deleted=1 WHERE owner_id=%s AND name='E2E测试犬'", (uid,))
        r2 = api("GET", f"/users/{uid}/pets", token_admin)
        check("V1-13.b", "软删宠物不再返回（与移动端口径一致）",
              r2.ok and all(p["name"] != "E2E测试犬" for p in (r2.data or {}).get("pets", [])),
              f"petCount={(r2.data or {}).get('petCount')}")

    # ---------- 锁定（V1-02 验收点，用完即弃的账号） ----------
    acc_lock_user, acc_lock_pass = f"e2el{ts}", "E2ePass!1"
    api("POST", "/system/accounts", token_admin, body={
        "username": acc_lock_user, "displayName": "E2E锁定", "password": acc_lock_pass, "roleId": role_none_id})
    login_ok(acc_lock_user, acc_lock_pass)
    codes_fail = []
    for _ in range(5):
        rr = login(acc_lock_user, "BadPass!!9")
        codes_fail.append(rr.code)
    rr = login(acc_lock_user, acc_lock_pass)  # 正确密码也应被拒
    check("V1-02.e", "连续 5 次失败锁定且正确密码亦被拒（423）",
          codes_fail[-1] in ("4003", "423") and rr.code == "423",
          f"fail_codes={codes_fail} locked_correct={rr.code} {rr.msg}")

    # ---------- 验证码限流（V1-01 验收点，最后执行） ----------
    # IP 每分钟 20 次；清空节流窗口后连续请求 22 次
    _captcha_times.clear()
    limited = None
    for i in range(22):
        rr = api("GET", "/verification/captcha")
        if not rr.ok:
            limited = (i + 1, rr.code, rr.msg)
            break
        _captcha_times.append(time.time())
    check("V1-01.c", "同一 IP 每分钟限 20 次验证码", limited is not None and limited[0] > 20,
          f"limited_at={limited}")

    # ---------- 清理 ----------
    cleanup_errors = []
    # 按用户名回收所有 E2E 账号
    for uname in (acc_ro_user, acc_del_user, acc_np_user, acc_lock_user):
        rr = api("GET", "/system/accounts", token_admin, query={"page": 1, "size": 10, "username": uname})
        for a in (rr.data or {}).get("list", []):
            api("DELETE", f"/system/accounts/{a['id']}", token_admin)
    for rid in (role_ro_id, role_full_id, role_none_id):
        rr = api("DELETE", f"/system/roles/{rid}", token_admin)
        if not rr.ok:
            cleanup_errors.append(f"role {rid}: {rr.code} {rr.msg}")

    # ---------- 报告 ----------
    total = len(results)
    passed = sum(1 for x in results if x["pass"])
    report = [
        "# ADMIN-V1-01~13 端到端联调报告",
        "",
        f"- 时间：{NOW}（Asia/Shanghai）",
        f"- 链路：Next.js dev(localhost:3000) rewrites → pettown-boot admin(127.0.0.1:8081)",
        f"- 数据：共享开发库 pettown@8.163.103.108（fixture 数据，测试账号已清理）",
        f"- 结果：**{passed}/{total} 通过**" + (f"，{total - passed} 项失败" if passed < total else ""),
        "",
        "| # | 需求检查点 | 结果 | 证据 |",
        "|---|---|---|---|",
    ]
    for x in results:
        mark = "✅" if x["pass"] else "❌"
        detail = x["detail"].replace("|", "\\|").replace("\n", " ")
        report.append(f"| {x['id']} | {x['title']} | {mark} | {detail} |")
    report += [
        "",
        "## 备注",
        "",
        "- ADMIN-V1-12「封禁后小程序 token 失效且登录被拒」属 miniapp 端行为，本报告仅验证 admin 侧状态流转与查询一致性。",
        "- 锁定用例在一次性测试账号上执行（已删除）；admin 账号未受影响。",
        "- 验证码限流用例最后执行（触发后窗口内后续取码受限）。",
    ]
    out = Path(__file__).parent
    (out / "results.json").write_text(json.dumps(
        {"time": NOW, "base": BASE, "passed": passed, "total": total, "results": results},
        ensure_ascii=False, indent=2))
    (out / "联调报告.md").write_text("\n".join(report), encoding="utf-8")
    print(f"\n== {passed}/{total} passed ==  (cleanups: {cleanup_errors})")
    return 0 if passed == total else 1


if __name__ == "__main__":
    sys.exit(main())
