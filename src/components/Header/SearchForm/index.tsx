import { MdSearch } from "react-icons/md";
import { StyledSearchForm } from "./style";
import { StyledButton } from "../../../styles/button";

import { useContext } from "react";
import { CartContext } from "../../../Providers/CartProvider";

const SearchForm = () => {
  const { products, setProducts, getValue, setGetValue } =
    useContext(CartContext);

  const filter = (value: string) => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );
    setProducts(filtered);
    setGetValue("");
  };

  const handleFormSubmit = (event: any) => {
    event.preventDefault();
    filter(getValue);
  };

  return (
    <StyledSearchForm onSubmit={handleFormSubmit}>
      <input
        type="text"
        placeholder="Digitar pesquisa"
        name="search"
        value={getValue}
        onChange={(e) => setGetValue(e.target.value)}
      />
      <StyledButton type="submit" $buttonSize="medium" $buttonStyle="green">
        <MdSearch />
      </StyledButton>
    </StyledSearchForm>
  );
};
export default SearchForm;
