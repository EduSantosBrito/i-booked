import React, { Component } from "react";
import Axios from "axios";
import ReserveList from "../../components/ReserveList";
import withStyle from "react-jss";
import Button from "../../components/Button";
import Logout from "../../components/Logout";

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
    justifyContent: "space-between",
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
    marginTop: 20,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  }
};
class DetailRestaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: null
    };
  }

  componentDidMount() {
    this.getRestaurant(this.props.match.params.id)
      .then(response => {
        this.setState({ restaurant: response.data });
      })
      .catch(error => console.log(error));
  }

  getRestaurant = id => {
    return new Promise((resolve, reject) => {
      Axios.get(`${process.env.REACT_APP_API_URL}/restaurants/${id}`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  };

  render() {
    const { restaurant } = this.state;
    return (
      <div className={this.props.classes.container}>
        <div className={this.props.classes.sidebar}>
          <div className={this.props.classes.box}>
            <h1 className={this.props.classes.logo}>iBooked</h1>
            <Button to="/dashboard/restaurant/create">Criar restaurante</Button>
            <Logout />
          </div>
        </div>
        {restaurant ? (
          <div className={this.props.classes.content}>
            <div className={this.props.classes.inputBox}>
              <label>Nome</label>
              <input type="text" value={restaurant.name} disabled />
            </div>
            <div className={this.props.classes.inputBox}>
              <label>Vagas disponíveis</label>
              <input type="text" value={restaurant.available} disabled />
            </div>
            Reservas:
            {restaurant.reserved.length > 0 ? (
              <ReserveList isDetail initialState={restaurant.reserved} />
            ) : (
              <p>Não foi efetuada nenhuma reserva</p>
            )}
            <div className={this.props.classes.buttonBox}>
              <button
                className={this.props.classes.button}
                onClick={() => this.props.history.goBack()}
              >
                Voltar
              </button>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
export default withStyle(styles)(DetailRestaurant);
