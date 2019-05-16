import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { AuthConsumer } from "../authContext";
import Logout from "../components/Logout";
import Can from "../components/Can";
import Button from "../components/Button";
import Axios from "axios";
import RestaurantList from "../components/RestaurantList";
import withStyle from "react-jss";

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
  }
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: null
    };
  }

  componentDidMount() {
    this.getRestaurants()
      .then(response => this.setState({ restaurants: response.data }))
      .catch(error => console.log(error));
  }
  getRestaurants = () => {
    return new Promise((resolve, reject) => {
      Axios.get(`${process.env.REACT_APP_API_URL}/restaurants`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  };

  deleteRestaurant = id => {
    return new Promise((resolve, reject) => {
      Axios.delete(`${process.env.REACT_APP_API_URL}/restaurants/${id}`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  };

  handleDelete = id => {
    this.deleteRestaurant(id)
      .then(response => {
        this.getRestaurants()
          .then(response => this.setState({ restaurants: response.data }))
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  };

  render() {
    return (
      <AuthConsumer>
        {({ user }) => (
          <Can
            role={user.role}
            perform="dashboard:visit"
            yes={() => (
              <div className={this.props.classes.container}>
                <div className={this.props.classes.sidebar}>
                  <div className={this.props.classes.box}>
                    <h1 className={this.props.classes.logo}>iBooked</h1>
                    <Button to="/dashboard/restaurant/create">
                      Criar restaurante
                    </Button>
                    <Logout />
                  </div>
                </div>
                <RestaurantList
                  initialState={this.state.restaurants}
                  handleDelete={this.handleDelete}
                />
              </div>
            )}
            no={() => {
              return <Redirect to="/" />;
            }}
          />
        )}
      </AuthConsumer>
    );
  }
}

export default withStyle(styles)(Dashboard);
