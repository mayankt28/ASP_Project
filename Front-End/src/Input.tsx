import styled from "styled-components";
export default function Input({
  id,
  type,
  placeholder,
  onChangeCallback,
}: {
  id: string;
  type: string;
  placeholder: string;
  onChangeCallback: any;
}) {
  return (
    <StyledInput
      id={id}
      type={type}
      onChange={onChangeCallback}
      placeholder={placeholder}
    />
  );
}

const StyledInput = styled.input`
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border-radius: 2rem;
  width: 80%;
  height: 3rem;
  padding: 1rem;
  margin: 2rem;
  border: none;
  outline: none;
  color: #353535;
  font-size: 1rem;
  font-weight: bold;
  &:focus {
    display: inline-block;
    box-shadow: 0 0 0 0.2rem #b9abe0;
    backdrop-filter: blur(12rem);
    border-radius: 2rem;
  }
  &::placeholder {
    color: #353535;
    font-weight: 100;
    font-size: 1rem;
  }
`;
