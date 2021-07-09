// react-router-dom stuff
import { Route, Switch } from "react-router-dom";

// pages
import Home from "./pages/Home";
import Play from "./pages/Play";

// styles
import "./App.css";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/play" component={Play} />
      </Switch>
    </div>
  );
}

export default App;
