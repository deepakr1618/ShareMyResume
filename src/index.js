import React, { createContext, useReducer } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { BrowserRouter as Router } from "react-router-dom";
import { Reducer, InitialState, ContextProvider } from "./state/reducer";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#55b79d",
    },
    secondary: {
      main: "#00a9bf",
    },
  },
  typography: {
    fontFamily: "'Sora', sans-serif",
  },
});

const Root = () => {
  const [state, dispatch] = useReducer(Reducer, InitialState);

  return (
    <ContextProvider value={[state, dispatch]}>
      <ThemeProvider theme={theme}>
        <Router>
          <App />
        </Router>
      </ThemeProvider>
    </ContextProvider>
  );
};

ReactDOM.render(<Root></Root>, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
