import React, { createContext, useState } from "react";
import { api } from "../Services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export interface IUserProvider {
  children: React.ReactNode;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ICreateUser {
  email: string;
  password: string;
  name: string;
  confirmPassword?: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
}

export interface IUserContext {
  createUser: (data: ICreateUser) => Promise<void>;
  login: (data: ILogin) => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<{}>>;
  modalOpen: () => void;
  modalClose: () => void;
  open: boolean;
  autologin: (userId: string) => Promise<void>;
  handleLogout: () => void;
}

export const UserContext = createContext({} as IUserContext);
export const UserProvider = ({ children }: IUserProvider) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);

  const createUser = async (data: ICreateUser) => {
    try {
      const response = await api.post("/users", data);

      toast.success("Usuário criado com sucesso.");

      navigate("/");
    } catch (error) {
      toast.error("Algo deu errado");
    }
  };

  const login = async (data: ILogin) => {
    try {
      const response = await api.post("/login", data);

      localStorage.setItem("user:userID", response.data.user.id);
      localStorage.setItem("user:token", response.data.accessToken);
      setUser(response.data.user);

      toast.success("Logado com sucesso!");

      navigate("/shop");
    } catch (error) {
      console.log(error);
      toast.error("Ops! Algo deu errado.");
    }
  };

  const autologin = async (userId: string) => {
    const token = localStorage.getItem("user:token");

    try {
      const response = await api.get(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    setUser({});
    navigate("/");
    localStorage.removeItem("user:token");
    localStorage.removeItem("user:userID");
  };

  const modalOpen = () => {
    setOpen(true);
  };

  const modalClose = () => {
    setOpen(false);
  };

  return (
    <UserContext.Provider
      value={{
        createUser,
        login,
        setUser,
        modalOpen,
        modalClose,
        open,
        autologin,
        handleLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
