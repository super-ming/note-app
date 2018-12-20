import React from "react";
import { Route } from "react-router-dom";

//Creates route and child component with passed in props (childProps from App.js)
//Props is the passed in by Route, cProps are the child props to be set
export default ({ component: C, props: cProps, ...rest }) =>
  <Route {...rest} render={props => <C {...props} {...cProps} />} />;
