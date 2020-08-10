import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

class NavBar extends Component {
  state = {};

  render() {
    const { user } = this.props;

    return (
      <nav className="navbar navbar-expand navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          Vidly
        </Link>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink className="nav-item nav-link" to="/movies">
              Movies
            </NavLink>
            <NavLink className="nav-item nav-link" to="/customers">
              Customers
            </NavLink>
            <NavLink className="nav-item nav-link" to="/rentals">
              Rentals
            </NavLink>
            {!user && (
              <React.Fragment>
                <NavLink className="nav-item nav-link" to="/login">
                  Login
                </NavLink>
                <NavLink className="nav-item nav-link" to="/register">
                  Register
                </NavLink>
              </React.Fragment>
            )}
            {user && (
              <React.Fragment>
                <NavLink className="nav-item nav-link" to="/profile">
                  {user.name}
                </NavLink>
                <NavLink className="nav-item nav-link" to="/logout">
                  Log Out
                </NavLink>
              </React.Fragment>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
