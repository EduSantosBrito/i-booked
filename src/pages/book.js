import React, { Component } from "react";
import { validate as validateCPF } from "gerador-validador-cpf";
import moment from "moment";
import Axios from "axios";
import backgroundImage from "../assets/images/backgroundImage.jpg";
import withStyle from "react-jss";
import Button from "../components/Button";
import { toast } from "react-toastify";

const styles = {
  container: {
    fontFamily: "'Montserrat', sans-serif",
    background: `url(${backgroundImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "14px"
  },
  box: {
    width: "500px",
    height: "auto",
    padding: "30px 50px",
    backgroundColor: "#FFFFFF",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  inputBox: {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
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
  title: {
    margin: 10,
    fontWeight: 500,
    fontSize: 20,
    color: "#F24C3D"
  },
  buttonBox: {
    marginTop: 20,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  }
};

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      lastName: "",
      cpf: "",
      rg: "",
      birthday: "",
      quantity: 0,
      errorMsg: null,
      restaurant: null
    };
  }

  componentDidMount() {
    this.getRestaurant(this.props.match.params.id)
      .then(response => this.setState({ restaurant: response.data }))
      .catch(error => console.log(error));
  }

  handleNameChange = event => {
    this.setState({ name: event.target.value });
  };

  handleLastNameChange = event => {
    this.setState({ lastName: event.target.value });
  };

  handleBirthdayChange = event => {
    this.setState({ birthday: event.target.value });
  };

  handleQuantityChange = event => {
    this.setState({ quantity: event.target.value });
  };

  handleCPFChange = event => {
    this.setState({ cpf: event.target.value });
  };

  handleRGChange = event => {
    this.setState({ rg: event.target.value });
  };

  getRestaurant = id => {
    return new Promise((resolve, reject) => {
      Axios.get(`${process.env.REACT_APP_API_URL}/restaurants/${id}`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  };
  putRestaurant = (id, body) => {
    return new Promise((resolve, reject) => {
      Axios.put(`${process.env.REACT_APP_API_URL}/restaurants/${id}`, body)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  };

  onClick = async () => {
    let {
      name,
      lastName,
      cpf,
      rg,
      birthday,
      quantity,
      restaurant
    } = this.state;
    if (this.validateForm()) {
      restaurant.reserved = [
        ...restaurant.reserved,
        {
          id: restaurant.reserved.length + 1,
          name,
          lastName,
          cpf,
          rg,
          birthday,
          quantity
        }
      ];

      restaurant.available -= quantity;
      this.putRestaurant(this.props.match.params.id, restaurant)
        .then(response => {
          toast.success("Reserva efetuada com sucesso!", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500
          });
          setTimeout(() => {
            this.props.history.push("/");
          }, 1500);
        })
        .catch(error => console.log(error));
    }
  };

  validateForm() {
    let {
      name,
      lastName,
      cpf,
      rg,
      birthday,
      quantity,
      restaurant
    } = this.state;
    if (
      name.trim() !== "" &&
      lastName.trim() !== "" &&
      cpf.trim() !== "" &&
      rg.trim() !== "" &&
      birthday.trim() !== "" &&
      quantity > 0
    ) {
      if (restaurant.available - quantity >= 0) {
        if (validateCPF(cpf)) {
          if (moment().diff(birthday, "years") >= 18) {
            this.setState({errorMsg: null})
            return true;
          } else {
            this.setState({errorMsg: "Menor de idade"});
            toast.error("Menor de idade", {
              position: toast.POSITION.TOP_RIGHT
            });
            return false;
          }
        } else {
          this.setState({errorMsg: "CPF inválido"});
          toast.error("CPF inválido", {
            position: toast.POSITION.TOP_RIGHT
          });
          return false;
        }
      } else {
        this.setState({errorMsg: "Quantidade maior que a disponível"});
        toast.error("Quantidade maior que a disponível", {
          position: toast.POSITION.TOP_RIGHT
        });
        return false;
      }
    } else {
      this.setState({errorMsg: "Campos em Branco"});
      toast.error("Campos em branco", { position: toast.POSITION.TOP_RIGHT });
      return false;
    }
  }

  render() {
    return (
      <div className={this.props.classes.container}>
        <div className={this.props.classes.box}>
          <h1>Reservando em:</h1>
          {this.state.restaurant ? (
            <h1 className={this.props.classes.title}>
              {this.state.restaurant.name}
            </h1>
          ) : null}
          <div className={this.props.classes.inputBox}>
            <label>Nome</label>
            <input
              type="text"
              value={this.state.name}
              onChange={this.handleNameChange}
            />
          </div>
          <div className={this.props.classes.inputBox}>
            <label>Sobrenome</label>
            <input
              type="text"
              value={this.state.lastName}
              onChange={this.handleLastNameChange}
            />
          </div>
          <div className={this.props.classes.inputBox}>
            <label>CPF</label>
            <input
              type="text"
              value={this.state.cpf}
              onChange={this.handleCPFChange}
            />
          </div>
          <div className={this.props.classes.inputBox}>
            <label>RG</label>
            <input
              type="text"
              value={this.state.rg}
              onChange={this.handleRGChange}
            />
          </div>
          <div className={this.props.classes.inputBox}>
            <label>Data de aniversário</label>
            <input
              type="date"
              value={this.state.birthday}
              onChange={this.handleBirthdayChange}
            />
          </div>
          <div className={this.props.classes.inputBox}>
            <label>Quantidade</label>
            <input
              type="number"
              value={this.state.quantity}
              onChange={this.handleQuantityChange}
            />
          </div>
          <div className={this.props.classes.buttonBox}>
            <Button to="/">Voltar</Button>
            <button
              id="submitButton"
              className={this.props.classes.button}
              onClick={this.onClick}
            >
              Reservar
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyle(styles)(Book);
