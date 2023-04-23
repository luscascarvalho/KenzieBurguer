import CartProductCard from "./CartProductCard";

import { StyledCartProductList } from "./style";
import { StyledButton } from "../../../styles/button";
import { StyledParagraph } from "../../../styles/typography";

import { useContext } from "react";
import { CartContext } from "../../../Providers/CartProvider";

const CartProductList = () => {
  const { addCart, setAddCart } = useContext(CartContext);

  const total = addCart.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.price;
  }, 0);

  return (
    <StyledCartProductList>
      <ul>
        {addCart.map((productCart) => (
          <CartProductCard
            image={productCart.img}
            name={productCart.name}
            id={productCart.id}
            key={productCart.id}
          />
        ))}
      </ul>

      <div className="totalBox">
        <StyledParagraph>
          <strong>Total</strong>
        </StyledParagraph>
        <StyledParagraph className="total">
          R$ {total.toFixed(2)}
        </StyledParagraph>
      </div>
      <StyledButton
        $buttonSize="default"
        $buttonStyle="gray"
        onClick={() => setAddCart([])}
      >
        Remover todos
      </StyledButton>
    </StyledCartProductList>
  );
};

export default CartProductList;
