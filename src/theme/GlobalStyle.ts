import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}
  body {
    background-color: ${({ theme }) => theme.body};
    background-image: ${({ theme }) => theme.backgroundImage};
    color: ${({ theme }) => theme.text};
    font-family: 'Roboto', sans-serif;
    transition: all 0.25s linear;
  }
`