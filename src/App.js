import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./components/Home";
import Search from "./components/search/Search";
import Login from "./components/login/Login";
import NavB from "./components/common/nav/NavB";
import Footer from "./components/common/footer/Footer";
import { ToTopArrow } from "./ToTheTop"

import { animateScroll as scroll } from "react-scroll";
import { scrollToTop } from "react-scroll/modules/mixins/animate-scroll";

import { of, fromEvent, animationFrameScheduler } from "rxjs";
import {
  distinctUntilChanged,
  filter,
  map,
  pairwise,
  switchMap,
  throttleTime,
} from "rxjs/operators";
import { useObservable } from "rxjs-hooks";

function App() {

  const watchScroll = () =>
  of(typeof window === "undefined").pipe(
    filter((bool) => !bool),
    switchMap(() => fromEvent(window, "scroll", { passive: true })),
    throttleTime(0, animationFrameScheduler),
    map(() => window.pageYOffset),
    pairwise(),
    map(([previous, current]) => (current < previous ? "Up" : "Down")),
    distinctUntilChanged()
  );

  const toggleScroll = () => {
    scroll.scrollToTop();
  };

  const scrollDirection = useObservable(watchScroll, "Up");
  const hide = scrollDirection === "Down" ? "" : "hide";
  return (
      <Router>
        <NavB/>
        <Switch>
          <Route exact path="/">
            <Home toggleScroll={toggleScroll}/>
          </Route>
          <Route exact path="/search">
            <Search/>
          </Route>
          <Route exact path="/login">
            <Login/>
          </Route>
        </Switch>
        <ToTopArrow className={hide} onClick={toggleScroll}></ToTopArrow>
        <Footer />
      </Router>
  );
}

export default App;
