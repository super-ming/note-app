import React from "react";
import { Route, Redirect } from "react-router-dom";

//Secured pages
//If user is authenticated, render the passed in component. If not, redirect to login page
export default ({ component: C, props: cProps, ...rest }) =>
  <Route
    {...rest}
    render={props =>
      cProps.isAuthenticated ? <C {...props} {...cProps} />
        : <Redirect
            to={`/login?redirect=${props.location.pathname}${props.location
              .search}`}
          />}
  />;
