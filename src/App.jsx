import "./App.css";
import { GlobalStyles } from "./GlobalStyles";
import { DefaultColors } from "./assets/themes/themes";
import TicTacToeGame from "./components/TicTacToeGame";
import { ThemeProvider } from "styled-components";

function App() {
  return (
    <ThemeProvider theme={DefaultColors}>
      <GlobalStyles />
      <TicTacToeGame />;
    </ThemeProvider>
  );
}

export default App;
