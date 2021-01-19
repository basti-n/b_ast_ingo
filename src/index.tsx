import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createGlobalStyle } from 'styled-components';

// Set global styles
export const GlobalStyle = createGlobalStyle`
  :root {
    box-sizing: border-box
  }
  html {
    background-image: linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%);
  }
  body {
    font-family: 'Balsamiq Sans', 'Roboto', cursive; 
    font-weight: lighter; 
    background: inherit;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0;
}
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
