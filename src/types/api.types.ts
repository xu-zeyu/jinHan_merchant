/** 后端统一响应包络 Result<T>，成功 code 为 "200" */
export type ApiResult<T> = {
  code: string;
  msg: string;
  data: T;
};

/** 分页结果 */
export type PageResult<T> = {
  list: T[];
  total: number;
};

/** 分页查询入参 */
export type PageQuery = {
  page: number;
  size: number;
};
