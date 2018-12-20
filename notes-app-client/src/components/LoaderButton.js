import React from "react";
import { Button, Glyphicon } from "react-bootstrap";
import "./LoaderButton.css";

//render different button based on isLoading flag to provide user feedback
export default ({
  isLoading,
  text,
  loadingText,
  className = "",
  disabled = false,
  ...props
}) =>
  <Button
    className={`LoaderButton ${className}`}
    disabled={disabled || isLoading}
    {...props}
  >
    {isLoading && <Glyphicon glyph="refresh" className="spinning" />}
    {!isLoading ? text : loadingText}
  </Button>;
