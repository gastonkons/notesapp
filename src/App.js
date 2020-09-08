import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import CreateNote from "./components/CreateNote/CreateNote";
import CreateUser from "./components/CreateUser/CreateUser";
import NotesList from "./components/NotesList/NotesList";
import Footer from "./components/Footer/Footer";
import NoMatch from "./components/NoMatch/NoMatch";
import "./App.css";

function App() {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route exact path="/" component={NotesList} />
        <Route exact path="/edit/:id" component={CreateNote} />
        <Route exact path="/create" component={CreateNote} />
        <Route exact path="/user" component={CreateUser} />
        <Route component={NoMatch} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
