import React, { Component } from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./home"
import Main from "./main";

export default class App extends Component {
    constructor() {
      super();
  
      this.state = {
        // loggedInStatus: "NOT_LOGGED_IN",
        user: {}
      };
    }

    render() {
      return (
        <div className="App">
         <Router>
           <Switch>
             <Route exact path='/' component={Home} />
             <Route path="/main" component={Main} />
           </Switch>
         </Router>
       </div>
     );
    }
}
