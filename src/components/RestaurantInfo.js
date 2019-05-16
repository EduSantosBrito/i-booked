import React, { useState, useEffect } from "react";
import Button from "./Button";
import withStyle from "react-jss";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    width: 230,
    height: 120,
    padding: 15,
    borderRadius: "2px",
    fontFamily: "'Montserrat', sans-serif"
  },
  title: {
    fontWeight: 400,
    color: "#F24C3D",
    fontSize: 20
  },
  subtitle: {
    fontWeight: 500,
    color: "#707070"
  },
  availableNumber: {
    fontWeight: 500,
    color: "#707070",
    fontSize: 30
  }
};

const RestaurantInfo = ({ initialState, classes }) => {
  const [restaurant, setRestaurant] = useState(initialState);

  useEffect(() => {
    setRestaurant(initialState);
  }, [initialState]);

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>{restaurant.name}</h1>
      <h2 className={classes.subtitle}>Lugares disponíveis</h2>
      <p className={classes.availableNumber}>{restaurant.available}</p>
      <Button to={`/book/${restaurant.id}`}>Reservar</Button>
    </div>
  );
};

export default withStyle(styles)(RestaurantInfo);
