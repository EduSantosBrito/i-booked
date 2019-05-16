import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import withStyle from "react-jss";

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

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }
  render() {
    return (
      <div>
        <button
          className={this.props.classes.button}
          onClick={() => this.props.history.push(this.props.to)}
        >
          {this.props.children}
        </button>
      </div>
    );
  }
}

export default withRouter(withStyle(styles)(Button));
