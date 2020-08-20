import React, { Component } from "react";
import { connect } from "react-redux";

import { loginUser } from "../../actions/index";

class Login extends Component {
  state = {
    email: "",
    password: "",
    error: "",
    touched: false,
  };

  handleInputEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  handleInputPassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  submitForm = (e) => {
    e.preventDefault();
    this.setState({ touched: true });
    this.props.dispatch(loginUser(this.state));
  };

  componentWillReceiveProps(nextState) {
    if (nextState.user.login.status === "success") {
      this.props.history.push("/user");
    }
  }

  render() {
    console.log(this.props);
    return (
      <div className="rl_container">
        <form onSubmit={this.submitForm}>
          <h2>Log in here</h2>

          <div className="form_element">
            <input
              type="email"
              placeholder="Enter your E-mail"
              values={this.state.email}
              onChange={this.handleInputEmail}
            />
          </div>
          <div className="form_element">
            <input
              type="password"
              placeholder="Enter your password"
              values={this.state.password}
              onChange={this.handleInputPassword}
            />
          </div>

          <button type="submit">Log in</button>

          <div className="error">
            {this.state.touched &&
            this.props.user.login &&
            this.props.user.login.status === "fail" ? (
              <div>Incorrect email or password</div>
            ) : null}
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Login);
