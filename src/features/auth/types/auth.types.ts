/** 管理员账号（Apifox: AccountResponse） */
export type Account = {
  id: number;
  username: string;
  displayName: string;
  roleId: number | null;
  phone: string | null;
  enabled: boolean;
  superAdmin: boolean;
  passwordChangeRequired: boolean;
  createdTime: string;
  updatedTime: string;
};

/** 角色（Apifox: RoleResponse） */
export type AuthRole = {
  id: number;
  code: string;
  name: string;
  enabled: boolean;
  createdTime: string;
  updatedTime: string;
};

/** 当前管理员信息（Apifox: MeResponse） */
export type MeResponse = {
  account: Account;
  roles: AuthRole[];
  permissions: string[];
};

/** 菜单节点（Apifox: MenuResponse） */
export type MenuItem = {
  code: string;
  title: string;
  path: string | null;
  children: MenuItem[];
};

/** 图形验证码（Apifox: CaptchaResponse） */
export type CaptchaResponse = {
  captchaId: string;
  imageBase64: string;
};

/** 登录入参（Apifox: V1LoginRequest） */
export type LoginRequest = {
  username: string;
  password: string;
  captchaId: string;
  captchaCode: string;
};

/** 登录响应（Apifox: LoginResponse） */
export type LoginResponse = {
  tokenType: string;
  token: string;
  expiresIn: number;
  account: Account;
};

/** 本人改密入参（Apifox: V1ChangePasswordRequest） */
export type ChangePasswordRequest = {
  oldPassword: string;
  newPassword: string;
};
