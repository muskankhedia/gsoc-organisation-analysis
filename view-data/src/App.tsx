import React from 'react';
import './App.css';
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import Navbar from "./components/Navbar";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from './components/Home';

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
  typography: {
    fontFamily: ["PT Sans"].join(","),
    fontSize: 12,
  },
});

function App() {

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact={true} path="/" component={Home} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
export default App;
