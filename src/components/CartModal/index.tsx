import { MdClose } from "react-icons/md";
import CartProductList from "./CartProductList";

import { StyledCartModalBox } from "./style";
import { StyledParagraph, StyledTitle } from "../../styles/typography";

import { useContext } from "react";
import { UserContext } from "../../Providers/UserProvider";
import { CartContext } from "../../Providers/CartProvider";

const CartModal = () => {
  const { modalClose } = useContext(UserContext);
  const { addCart } = useContext(CartContext);

  return (
    <StyledCartModalBox>
      <dialog>
        <header>
          <StyledTitle tag="h2" $fontSize="three">
            Carrinho de compras
          </StyledTitle>
          <button
            type="button"
            aria-label="Fechar"
            onClick={() => {
              modalClose();
            }}
          >
            <MdClose size={21} />
          </button>
        </header>
        <div className="cartBox">
          <CartProductList />

          <div className="emptyBox">
            {addCart.length === 0 ? (
              <StyledTitle tag="h3" $fontSize="three" textAlign="center">
                Sua sacola está vazia
              </StyledTitle>
            ) : null}

            {addCart.length === 0 ? (
              <StyledParagraph textAlign="center">
                Adicione itens
              </StyledParagraph>
            ) : null}
          </div>
        </div>
      </dialog>
    </StyledCartModalBox>
  );
};

export default CartModal;
