import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Search from "./components/search/Search";
import Login from "./components/login/Login";
import NavB from "./components/common/nav/NavB";
import Footer from "./components/common/footer/Footer";

function App() {
  return (
    <div>
      <Router>
        <NavB />
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route exact path="/search">
            <Search/>
          </Route>
          <Route exact path="/login">
            <Login/>
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
