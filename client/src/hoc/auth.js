import React, { Component } from "react";
import { auth } from "../actions/index";
import { connect } from "react-redux";

export default function (ComposedClass, redirect) {
  class AuthenticationCheck extends Component {
    state = {
      loading: true,
      demo: "1",
    };

    componentDidMount() {
      this.props.dispatch(auth());
    }

    static getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.user.login) {
        if (nextProps.user.login.status === "fail") {
          if (redirect === true) nextProps.history.push("/login");
        } else {
          if (redirect === false) nextProps.history.push("/user");
        }
        return {
          ...prevState,
          loading: false,
        };
      } else return null;
    }

    render() {
      if (this.state.loading) {
        return <div className="loader">Loading...</div>;
      }

      return (
        <div>
          <ComposedClass {...this.props} user={this.props.user} />
        </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      user: state.user,
    };
  };

  return connect(mapStateToProps)(AuthenticationCheck);
}
