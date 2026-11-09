import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().trim().min(1, "请输入管理员账号"),
  password: z.string().min(1, "请输入密码"),
  captchaCode: z.string().trim().min(1, "请输入图形验证码"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
