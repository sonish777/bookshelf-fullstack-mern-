import React, { PureComponent } from "react";
import { connect } from "react-redux";

import { getUsers, registerUser } from "../../actions/index";

class Register extends PureComponent {
  state = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    error: "",
  };

  componentDidMount() {
    this.props.dispatch(getUsers());
  }

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

  handleInputFname = (e) => {
    this.setState({
      firstname: e.target.value,
    });
  };

  handleInputLname = (e) => {
    this.setState({
      lastname: e.target.value,
    });
  };

  submitForm = (e) => {
    e.preventDefault();
    this.setState({
      error: "",
    });

    // console.log(this.state);

    this.props.dispatch(
      registerUser(
        {
          email: this.state.email,
          password: this.state.password,
          firstname: this.state.firstname,
          lastname: this.state.lastname,
        },
        this.props.user.users
      )
    );
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.user.register) {
      if (nextProps.user.register === "fail") {
        return { error: "Error, try again" };
      } else if (nextProps.user.register === "success") {
        return {
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          error: "",
        };
      } else return {};
    } else return {};
  }

  showUsers = (users) => {
    return users.users
      ? users.users.map((item) => (
          <tr key={item._id}>
            <td>{item.firstname}</td>
            <td>{item.lastname}</td>
            <td>{item.email}</td>
          </tr>
        ))
      : null;
  };

  render() {
    console.log(this.props);
    let users = this.props.user;
    return (
      <div className="rl_container">
        <form onSubmit={this.submitForm}>
          <h2>Add user</h2>

          <div className="form_element">
            <input
              type="text"
              placeholder="Enter firstname"
              value={this.state.firstname}
              onChange={this.handleInputFname}
            />
          </div>

          <div className="form_element">
            <input
              type="text"
              placeholder="Enter lastname"
              value={this.state.lastname}
              onChange={this.handleInputLname}
            />
          </div>

          <div className="form_element">
            <input
              type="text"
              placeholder="Enter your email"
              value={this.state.email}
              onChange={this.handleInputEmail}
            />
          </div>

          <div className="form_element">
            <input
              type="password"
              placeholder="Enter Password"
              value={this.state.password}
              onChange={this.handleInputPassword}
            />
          </div>

          <button type="submit">Add user</button>
          <div className="error">{this.state.error}</div>
        </form>

        <div className="current_users">
          <h4>Current Users:</h4>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Lastname</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>{this.showUsers(users)}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Register);
