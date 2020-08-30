import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//redux
import { Provider } from "react-redux";
import store from "./store/store";

//css
import "./App.css";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createTheme from "@material-ui/core/styles/createMuiTheme";
//pages
import Home from "./pages/home.jsx";
import Login from "./pages/login.jsx";
import SignUp from "./pages/signup";
//components
import Nav from "./components/nav.jsx";
//util
import jwtDecode from "jwt-decode";
import Auth from "./util/auth";

const token = localStorage.IdToken;
let authenticated;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    authenticated = false;
    // window.location.href = "/login";
  } else {
    authenticated = true;
    // axios.defaults.headers.common["Authorization"] = token;
  }
}

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
      <Provider store={store}>
        <div className="App" className="app-container">
          <header>Header</header>
          <Router>
            <Nav />
            <div className="container">
              <Switch>
                <Route exact path="/home" component={Home} />
                <Auth
                  exact
                  path="/login"
                  component={Login}
                  authenticated={authenticated}
                />
                <Auth
                  exact
                  path="/signup"
                  component={SignUp}
                  authenticated={authenticated}
                />
              </Switch>
            </div>
          </Router>
        </div>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
