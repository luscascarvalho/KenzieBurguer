import { StyledButton } from "../../../styles/button";
import { StyledForm } from "../../../styles/form";
import Input from "../Input";

import { useContext } from "react";
import { ILogin, UserContext } from "../../../Providers/UserProvider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "./loginSchema";

const LoginForm = () => {
  const { login } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: zodResolver(LoginSchema),
  });

  const logged = async (data: ILogin) => {
    await login(data);
  };

  return (
    <StyledForm onSubmit={handleSubmit(logged)}>
      <Input
        id="login"
        registerValue={register("email")}
        placeholder="Email"
        errorMessage={errors.email?.message}
        type="email"
      />
      <Input
        id="senha"
        registerValue={register("password")}
        placeholder="Senha"
        errorMessage={errors.password?.message}
        type="password"
      />
      <StyledButton $buttonSize="default" $buttonStyle="green">
        Entrar
      </StyledButton>
    </StyledForm>
  );
};

export default LoginForm;
