import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
*{
  box-sizing:border-box;
  margin: 0;
  padding:0;
}
#root{

  display:flex;
  justify-content:center;
  height:100%;
}
body{
  height:100vh;
}
`;
