import React, { Component } from "react";
import './home.css';
import { Link } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Login from "./login";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
  }

  handleSuccessfulAuth(data) {
    this.props.history.push('/main');
  }

  render() {
    return (
      <div>
         <nav className="navbar navbar-expand-lg navbar-light fixed-top">
           <div className="container">
             <Link className="navbar-brand" to={"/sign-in"}>devjobhunter.com</Link>
             <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
               <ul className="navbar-nav ml-auto">
                 <li className="nav-item">
                   <Link className="nav-link" to={"/sign-in"}>Login</Link>
                 </li>
                 {/* <li className="nav-item">
                   <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                 </li> */}
               </ul>
             </div>
           </div>
          </nav>
          <div className="auth-container">
          <div className="auth-wrapper">
            <div className="auth-inner">
              <h1 className="title1">Job Hunter</h1><br />
              {/* <h2 className="title2">Please Login</h2> */}
              {/* <button onClick={() => this.handleLogoutClick()}>Logout</button> */}
              {/* <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} /> */}
             <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
           </div>
          </div>
          </div>
       </div>
    );
  }
}
