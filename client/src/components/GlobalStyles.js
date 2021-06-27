import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body {
        background-color: #202060;
    }
    p {
        color: #B030B0;
    }
    h1, h2 {
        color: #B030B0;
    }
`;

export default GlobalStyle;