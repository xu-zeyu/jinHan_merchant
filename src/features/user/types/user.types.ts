import type { PageResult } from "@/types/api.types";

/** C 端用户（Apifox: AdminUserResponse） */
export type AppUser = {
  id: string;
  phone: string;
  source: string;
  /** ACTIVE 正常；BANNED 永久封禁 */
  status: string;
  createdAt: string;
};

export type UserPageResult = PageResult<AppUser>;

/** 分页筛选（ADMIN-V1-12） */
export type UserQuery = {
  page: number;
  size: number;
  phone?: string;
  source?: string;
};

/** 封禁/解封入参（Apifox: UserStatusRequest） */
export type UserStatusRequest = {
  status: "ACTIVE" | "BANNED";
};

/** 宠物档案（Apifox: PetItem） */
export type UserPet = {
  id: number;
  ownerId: string;
  name: string;
  species: string;
  breed: string;
  gender: string;
  birthDate: string | null;
  weightKg: number | null;
  sterilized: boolean;
  avatarUrl: string;
  createdTime: string;
  updatedTime: string;
};

/** 用户宠物数据（Apifox: AdminUserPetsResponse） */
export type UserPetsResponse = {
  userId: string;
  petCount: number;
  pets: UserPet[];
};
