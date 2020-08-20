import React, { Component } from "react";
import FontAwesome from "react-fontawesome";
import { Link } from "react-router-dom";

import Nav from "./SideNav/side-nav.component";

class Header extends Component {
  state = {
    showNav: false,
  };

  onHideNav = () => {
    this.setState({
      showNav: false,
    });
  };

  onShowNav = () => {
    this.setState({
      showNav: true,
    });
  };

  render() {
    return (
      <header>
        <div className="open_nav">
          <FontAwesome
            name="bars"
            style={{
              color: "#ffffff",
              padding: "10px",
              cursor: "pointer",
            }}
            onClick={this.onShowNav}
          />
        </div>
        <Nav showNav={this.state.showNav} onHideNav={this.onHideNav} />
        <Link to="/" className="logo">
          The Book Shelf
        </Link>
      </header>
    );
  }
}

export default Header;
