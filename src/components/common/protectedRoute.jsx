import React from "react";
import { Route, Redirect } from "react-router-dom";
import * as auth from "../../services/authService";

const ProtectedRoute = ({ component: Component, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.getUser())
          return Component ? <Component {...props} /> : render(props);
        else
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          );
      }}
    />
  );
};

export default ProtectedRoute;
