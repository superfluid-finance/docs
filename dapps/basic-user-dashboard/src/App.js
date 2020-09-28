import React from "react";
import ReactDOM from "react-dom";
import Home from "./components/home";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return <Home />;
};

export default App;

ReactDOM.render(<App />, document.getElementById("container"));
