import { StyledInputContainer } from "../../../styles/form";
import { StyledParagraph } from "../../../styles/typography";
import { UseFormRegisterReturn } from "react-hook-form";

interface IInputProps {
  id: string;
  registerValue: UseFormRegisterReturn<any>;
  placeholder?: string | undefined;
  errorMessage: any;
  type?: React.HTMLInputTypeAttribute | undefined;
}

const Input = ({
  id,
  registerValue,
  placeholder,
  errorMessage,
  type,
}: IInputProps) => (
  <div>
    <StyledInputContainer>
      <input id={id} {...registerValue} placeholder={placeholder} type={type} />
      <label htmlFor={id}></label>
    </StyledInputContainer>
    {errorMessage && (
      <StyledParagraph fontColor="red">{errorMessage}</StyledParagraph>
    )}
  </div>
);

export default Input;
