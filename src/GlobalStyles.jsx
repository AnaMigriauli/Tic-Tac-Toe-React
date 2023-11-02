import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

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
  font-family: 'Inter', sans-serif; 
}
`;
