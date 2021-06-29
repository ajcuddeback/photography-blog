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
    h1, h2, label, a {
        color: #B030B0;
    }
    a {
        text-decoration: none;
    }

    label {
        font-size: 20px;
    }

    button {
        max-width: 5rem;
        background-color: #202040;
        padding: .25rem;
        border: none;
        color: #B030B0;
        font-weight: bold;
        border: .5px solid #B030B0;
        border-radius: 5px;
        cursor: pointer;
        &:hover {
            color: #202040;
            background-color: #B030B0;
            border: .5px solid #202040;
        }
    }
`;

export default GlobalStyle;