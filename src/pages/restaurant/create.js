import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Axios from "axios";
import withStyle from "react-jss";
import Button from "../../components/Button";
import Logout from "../../components/Logout";
import { toast } from "react-toastify";

const styles = {
  container: {
    fontFamily: "Montserrat, sans-serif",
    display: "grid",
    gridTemplateColumns: "1fr 3fr",
    gridTemplateAreas: "'sidebar content'",
    width: "100%",
    height: "100%"
  },
  sidebar: {
    width: "100%",
    height: "100%",
    gridArea: "sidebar",
    backgroundColor: "#F24C3D",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start"
  },
  logo: {
    fontSize: 50,
    color: "#707070"
  },
  box: {
    marginTop: 20,
    width: "80%",
    height: "30%",
    backgroundColor: "#FFFFFF",
    borderRadius: "2px",
    padding: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center"
  },
  content: {
    margin: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  inputBox: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    "& label": {
      width: 150
    },
    "& input": {
      padding: "10px 30px",
      borderRadius: "2px",
      border: "1px solid #707070",
      outline: "none",
      width: 150
    },
    "& input:hover": {
      borderColor: "#F24C3D"
    },
    "& input:focus": {
      borderColor: "#F24C3D"
    }
  },
  button: {
    borderRadius: "2px",
    cursor: "pointer",
    outline: "none",
    backgroundColor: "#F24C3D",
    border: "none",
    padding: "10px 30px",
    color: "#FFFFFF"
  },
  buttonBox: {
    marginTop: "30%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  }
};

class CreateRestaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      available: 0
    };
  }

  handleNameChange = event => {
    this.setState({ name: event.target.value });
  };

  handleAvailableChange = event => {
    this.setState({ available: event.target.value });
  };

  save = () => {
    let { name, available } = this.state;
    Axios.post(`${process.env.REACT_APP_API_URL}/restaurants`, {
      name,
      available,
      reserved: []
    })
      .then(response => {
        toast.success("Restaurante editado com sucesso!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500
        });
        setTimeout(() => {
          this.props.history.goBack();
        }, 1500);
      })
      .catch(error => console.log(error));
  };

  render() {
    return (
      <div className={this.props.classes.container}>
        <div className={this.props.classes.sidebar}>
          <div className={this.props.classes.box}>
            <h1 className={this.props.classes.logo}>iBooked</h1>
            <Button to="/dashboard/restaurant/create">Criar restaurante</Button>
            <Logout />
          </div>
        </div>
        <div className={this.props.classes.content}>
          <div className={this.props.classes.inputBox}>
            <label>Nome</label>
            <input
              type="text"
              value={this.state.name}
              onChange={this.handleNameChange}
            />
          </div>
          <div className={this.props.classes.inputBox}>
            <label>Vagas disponíveis</label>
            <input
              type="text"
              value={this.state.available}
              onChange={this.handleAvailableChange}
            />
          </div>
          <div className={this.props.classes.buttonBox}>
            <button
              className={this.props.classes.button}
              onClick={() => this.props.history.goBack()}
            >
              Voltar
            </button>
            <button className={this.props.classes.button} onClick={this.save}>
              Salvar
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(withStyle(styles)(CreateRestaurant));
