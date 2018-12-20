import React from "react";
import { Route, Redirect } from "react-router-dom";

function querystring(name, url = window.location.href) {
  name = name.replace(/[[]]/g, "\\$&");
  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i");
  //search url string for the part that starts with "?or&redirect=/"and return arrays of matches
  const results = regex.exec(url);

  if (!results) {
    return null;
  }
  if (!results[2]) {
    return "";
  }
  //replace "+" in url with empty space
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export default ({ component: C, props: cProps, ...rest }) => {
  const redirect = querystring("redirect");
  return (
    <Route
      {...rest}
      render={props =>
        !cProps.isAuthenticated
          ? <C {...props} {...cProps} />
          : <Redirect
              to={redirect === "" || redirect === null ? "/" : redirect}
            />}
    />
  );
};
