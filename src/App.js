//react
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

//redux
import { logoutUser } from "./store/actions";

const token = localStorage.IdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store(store.dispatch(logoutUser()));
    // window.location.href = "/login";
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
                  authenticated={store.getState().authenticated}
                />
                <Auth
                  exact
                  path="/signup"
                  component={SignUp}
                  authenticated={store.getState().user.authenticated}
                />
              </Switch>
            </div>
          </Router>
        </div>
      </Provider>
    </MuiThemeProvider>
  );
}

//connect subscribe/unsubscribe the redux store
export default App;
