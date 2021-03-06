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
    h1, h2, label, a, p {
        color: #B030B0;
        font-family: PlayfairDisplay;
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


    select {
        display: block;
        font-family: PlayfairDisplay;
        background-color: #B030B0;
        color: white;
        padding: .2rem .5rem;
        &:hover {
            cursor: pointer;
        }
    }

    ::-webkit-scrollbar {
        width: 11px;
    }
        /* Track */
    ::-webkit-scrollbar-track {
    background: #1f1d42; 
    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
    background: #B030B0; 
    border-radius: 10px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
    background: #802280; 
}
`;

export default GlobalStyle;