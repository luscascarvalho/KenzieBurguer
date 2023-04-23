import { MdDelete } from "react-icons/md";

import { StyledCartProductCard } from "./style";
import { StyledTitle } from "../../../../styles/typography";

import { useContext } from "react";
import { CartContext } from "../../../../Providers/CartProvider";

interface ICartProductCardProps {
  image: string;
  name: string;
  id: number;
}

const CartProductCard = ({ image, name, id }: ICartProductCardProps) => {
  const { addCart, setAddCart } = useContext(CartContext);

  const remove = (productId: number) => {
    const newProductList = addCart.filter((product) => {
      return product.id !== productId;
    });

    setAddCart(newProductList);
  };

  return (
    <StyledCartProductCard>
      <div className="imageBox">
        <img src={image} alt={name} />
      </div>
      <div className="contentBox">
        <StyledTitle tag="h3" $fontSize="three">
          {name}
        </StyledTitle>
        <button type="button" aria-label="Remover" onClick={() => remove(id)}>
          <MdDelete size={24} />
        </button>
      </div>
    </StyledCartProductCard>
  );
};

export default CartProductCard;
