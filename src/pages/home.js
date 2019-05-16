import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import withStyle from "react-jss";
import Axios from "axios";

import { AuthConsumer } from "../authContext";

import Login from "../components/Login";
import RestaurantInfo from "../components/RestaurantInfo";

import backgroundImage from "../assets/images/backgroundImage.jpg";

const styles = {
  container: {
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gridTemplateAreas: "'list form'",
    color: "#707070",
    fontFamily: "'Montserrat', sans-serif"
  },
  list: {
    width: "90%",
    height: "calc(100% - 50px)",
    padding: "50px 5% 0px 5%",
    gridArea: "list",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    background: `url(${backgroundImage})`,
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  },
  form: {
    gridArea: "form"
  },
  loginButton: {
    height: "10%",
    margin: "15px",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  info: {
    height: "80%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column"
  },
  logo: {
    fontSize: 50
  },
  slogan: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    fontWeight: 700,
    fontSize: 50,
    "& p": {
      margin: "10px"
    },
    "& span": {
      color: "#F24C3D"
    }
  },
  frase: {
    width: 300,
    textAlign: "center"
  }
};

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: []
    };
  }

  getRestaurants = () => {
    return new Promise((resolve, reject) => {
      Axios.get(`${process.env.REACT_APP_API_URL}/restaurants`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  };

  componentDidMount() {
    this.getRestaurants()
      .then(response => this.setState({ restaurants: response.data }))
      .catch(error => console.log(error));
  }

  render() {
    return (
      <AuthConsumer>
        {({ authenticated }) =>
          authenticated ? (
            <Redirect to="/dashboard" />
          ) : (
            <div className={this.props.classes.container}>
              <div className={this.props.classes.list}>
                {this.state.restaurants && this.state.restaurants.length > 0 ? (
                  this.state.restaurants.map(restaurant => {
                    return (
                      <RestaurantInfo
                        key={`Restaurante-${restaurant.id}`}
                        initialState={restaurant}
                      />
                    );
                  })
                ) : (
                  <p>Não há restaurantes cadastrados</p>
                )}
              </div>
              <div className={this.props.classes.form}>
                <div className={this.props.classes.loginButton}>
                  <Login />
                </div>
                <div className={this.props.classes.info}>
                  <h1 className={this.props.classes.logo}>iBooked</h1>
                  <div className={this.props.classes.slogan}>
                    <p>Rápido</p>
                    <p>Fácil</p>
                    <p>
                      e <span>Seguro</span>
                    </p>
                  </div>
                  <p className={this.props.classes.frase}>
                    Poupe problemas na hora de reservar o seu restaurante.
                    Clicou, preencheu, reservou!
                  </p>
                </div>
              </div>
            </div>
          )
        }
      </AuthConsumer>
    );
  }
}
export default withStyle(styles)(Homepage);
