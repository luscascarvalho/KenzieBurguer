import { StyledProductCard } from "./style";
import { StyledButton } from "../../../styles/button";
import { StyledParagraph, StyledTitle } from "../../../styles/typography";

import { IProducts } from "../../../Providers/CartProvider";
import { useContext } from "react";
import { CartContext } from "../../../Providers/CartProvider";

interface IProductCartProps {
  product: IProducts;
}

const ProductCard = ({ product }: IProductCartProps) => {
  const { checking } = useContext(CartContext);

  return (
    <StyledProductCard>
      <div className="imageBox">
        <img src={product.img} alt="Hamburguer" />
      </div>
      <div className="content">
        <StyledTitle tag="h3" $fontSize="three">
          {product.name}
        </StyledTitle>
        <StyledParagraph className="category">
          {product.category}
        </StyledParagraph>
        <StyledParagraph className="price">
          R$ {product.price.toFixed(2)}
        </StyledParagraph>
        <StyledButton
          $buttonSize="medium"
          $buttonStyle="green"
          onClick={() => checking(product)}
        >
          Adicionar
        </StyledButton>
      </div>
    </StyledProductCard>
  );
};

export default ProductCard;
