import { z } from "zod";

export const RegisterSchema = z
  .object({
    name: z
      .string()
      .min(3, "O nome é obrigatório e precisa de pelos menos 3 caracteres."),
    email: z
      .string()
      .min(1, "O e-mail é obrigatório.")
      .email("Forneça um email válido."),
    password: z
      .string()
      .min(8, "A senha precisa ter no minímo 8 caracteres.")
      .regex(/(?=.*?[A-Z])/, "É necessário ao menos uma letra maiúscula")
      .regex(/(?=.*?[a-z])/, "É necessário ao menos uma letra minúscula")
      .regex(/(?=.*?[0-9])/, "É necessário pelo menos um número"),
    confirmPassword: z.string().min(1, "A confirmação de senha é obrigatória"),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "As senhas precisam ser iguais!",
    path: ["passwordConfirmed"],
  });
