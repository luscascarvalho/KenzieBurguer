import Input from "../Input";
import { StyledButton } from "../../../styles/button";
import { StyledForm } from "../../../styles/form";

import { useForm } from "react-hook-form";
import { useContext } from "react";
import { RegisterSchema } from "./registerSchema";
import { ICreateUser, UserContext } from "../../../Providers/UserProvider";
import { zodResolver } from "@hookform/resolvers/zod";

const RegisterForm = () => {
  const { createUser } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateUser>({
    resolver: zodResolver(RegisterSchema),
  });

  const registerUser = async (data: ICreateUser) => {
    await createUser(data);
  };

  return (
    <StyledForm onSubmit={handleSubmit(registerUser)}>
      <Input
        id="name"
        registerValue={register("name")}
        placeholder="Nome Completo"
        errorMessage={errors.name?.message}
        type="text"
      />
      <Input
        id="email"
        registerValue={register("email")}
        placeholder="E-mail"
        errorMessage={errors.email?.message}
        type="email"
      />
      <Input
        id="password"
        registerValue={register("password")}
        placeholder="Senha"
        errorMessage={errors.password?.message}
        type="password"
      />
      <Input
        id="confirmPassword"
        registerValue={register("confirmPassword")}
        placeholder="Confirmar senha"
        errorMessage={errors.confirmPassword?.message}
        type="password"
      />
      <StyledButton $buttonSize="default" $buttonStyle="gray" type="submit">
        Cadastrar
      </StyledButton>
    </StyledForm>
  );
};

export default RegisterForm;
