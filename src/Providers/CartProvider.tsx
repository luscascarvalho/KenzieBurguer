import React, { createContext, useEffect, useState } from "react";
import { api } from "../Services/api";
import { ToastContainer, toast } from "react-toastify";

export interface ICartProvider {
  children: React.ReactNode;
}

export interface IProducts {
  id: number;
  name: string;
  category: string;
  price: number;
  img: string;
}

export interface ICartContext {
  products: IProducts[];
  setProducts: React.Dispatch<React.SetStateAction<IProducts[]>>;
  addCart: IProducts[];
  setAddCart: React.Dispatch<React.SetStateAction<IProducts[]>>;
  getValue: string;
  setGetValue: React.Dispatch<React.SetStateAction<string>>;
  filteredProducts: IProducts[];
  setFilteredProducts: React.Dispatch<React.SetStateAction<IProducts[]>>;
  checking: (product: IProducts) => void;
}

export interface IInput {
  value: string;
}

export const CartContext = createContext({} as ICartContext);

export const CartProvider = ({ children }: ICartProvider) => {
  const [products, setProducts] = useState<IProducts[]>([]);
  const [addCart, setAddCart] = useState<IProducts[]>([]);
  const [getValue, setGetValue] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<IProducts[]>([]);

  const token = localStorage.getItem("user:token");

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await api.get("/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  const checking = (product: IProducts) => {
    if (!addCart.some((checkProduct) => checkProduct.id === product.id)) {
      toast.success("Produto adicionado ao carrinho!");

      setAddCart([...addCart, product]);
    } else {
      toast.error("Produto já no carrinho.");
    }
  };

  return (
    <CartContext.Provider
      value={{
        products,
        addCart,
        setAddCart,
        setProducts,
        getValue,
        setGetValue,
        filteredProducts,
        setFilteredProducts,
        checking,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
