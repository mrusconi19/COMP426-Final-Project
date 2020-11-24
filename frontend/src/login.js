import React, { Component } from "react";
import axios from "axios";
// import React, { useState } from "react";

// const [email, setEmail] = useState("");
// const [password, setPassword] = useState("");

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      password: ""
      //loginErrors: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.dismissError = this.dismissError.bind(this);
  }

  // dismissError() {
  //   this.setState({ error: '' });
  // }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    const { user, password } = this.state;

    var apiBaseUrl = "http://localhost:3001/";
    var payload = {
    "user": user,
    "password": password
    }
    axios.post(apiBaseUrl+'login', payload, { withCredentials: true })
      .then(response => {
        // console.log("res from login", response)
        if (response.data) {
          this.props.handleSuccessfulAuth(response.data);
          console.log(response.data);
        }
      })
      .catch(error => {
        console.log("login error", error);
        console.log(error.response);
        if (error.response.data === "Not found") {alert("Username does not exists")};
        if (error.response.data === "Unauthorized") {alert("Password do not match")};
      });
    event.preventDefault();
  }

  handleClick(e) {
    e.preventDefault();
        alert('user: admin, password: admin');
  }

    render() {
        return (
          <div>
            <form onSubmit={this.handleSubmit}>
                <h3>Login</h3>
                <div className="form-group">
                    <label>User</label>
                    <input
                      type="user" 
                      name="user"
                      className="form-control" 
                      placeholder="Enter username" 
                      value={this.state.user}
                      onChange={this.handleChange}
                      required
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input 
                     type="password" 
                     name="password"
                     className="form-control" 
                     placeholder="Enter password" 
                     value={this.state.password}
                     onChange={this.handleChange}
                     required
                    />
                </div>

                {/* <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div> */}

                <button type="submit" className="btn btn-primary btn-block">Login</button>
                <p className="forgot-password text-right">
                  Forgot <a href="/#" onClick={this.handleClick}>password?</a>
                </p>
            </form>
          </div>
        );
    }
}