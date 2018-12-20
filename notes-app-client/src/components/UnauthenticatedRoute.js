import React from "react";
import { Route, Redirect } from "react-router-dom";

function querystring(name, url = window.location.href) {
  console.log(name)
  name = name.replace(/[[]]/g, "\\$&");
  console.log(name);
  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i");
  console.log(url);
  const results = regex.exec(url);
  console.log(results);

  if (!results) {
    return null;
  }
  if (!results[2]) {
    return "";
  }

  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export default ({ component: C, props: cProps, ...rest }) => {
  const redirect = querystring("redirect");
  console.log(redirect);
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
