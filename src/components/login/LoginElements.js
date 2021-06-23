import styled from "styled-components";

export const Btn = styled.button`
  border-radius: 10px;
  background: #f94444;
  padding: 5px 22px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin: 1rem 0;
  align-self:center;

  &:hover {
    transition: all 0.4s ease-in-out;
    background: #d43333;
  }
`;
export const LoginContainer= styled.div`
min-height:79vh;
`