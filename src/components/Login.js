import React from "react";
import withStyle from "react-jss";

import { AuthConsumer } from "../authContext";

const styles = {
  button: {
    borderRadius: "2px",
    cursor: "pointer",
    outline: "none",
    backgroundColor: "#F24C3D",
    border: "none",
    padding: "10px 30px",
    color: "#FFFFFF"
  }
};

const Login = ({ classes }) => (
  <AuthConsumer>
    {({ initiateLogin }) => (
      <button className={classes.button} onClick={initiateLogin}>
        Login
      </button>
    )}
  </AuthConsumer>
);

export default withStyle(styles)(Login);
