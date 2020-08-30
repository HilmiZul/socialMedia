import React from "react";
import "./App.css";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createTheme from "@material-ui/core/styles/createMuiTheme";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/home.jsx";
import Login from "./pages/login.jsx";

import Nav from "./components/nav.jsx";
import SignUp from "./pages/signup";

const theme = createTheme({
  palette: {
    primary: {
      light: "#33c9dc",
      main: "#00bcd4",
      dark: "#008394",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff6333",
      main: "#ff3d00",
      dark: "#b22a00",
      contrastText: "#fff",
    },
    typography: {
      useNextVariants: true,
    },
  },
});
function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App" className="app-container">
        <header>Header</header>
        <Router>
          <Nav />
          <div className="container">
            <Switch>
              <Route exact path="/home" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={SignUp} />
            </Switch>
          </div>
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
