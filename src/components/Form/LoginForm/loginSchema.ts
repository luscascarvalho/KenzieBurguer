import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().min(2, "É necessário que seja um email cadastrado"),
  password: z.string().min(2, "Senha incorreta"),
});
