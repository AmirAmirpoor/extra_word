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
        <Route exact path="/extra_word" component={Home} />
        <Route exact path="/extra_word/play" component={Play} />
      </Switch>
    </div>
  );
}

export default App;
