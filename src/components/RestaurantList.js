import React, { useState, useEffect } from "react";
import Button from "./Button";
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
  },
  table: {
    fontFamily: "Montserrat, sans-serif",
    borderCollapse: "collapse",
    width: "80%",
    "& td": {
      border: "1px solid #ddd",
      padding: "8px"
    },
    "& th": {
      border: "1px solid #ddd",
      padding: "12px 8px",
      textAlign: "left",
      backgroundColor: "#F24C3D",
      color: "#FFFFFF"
    },
    "& tr:nth-child(even)": {
      backgroundColor: "#f2f2f2"
    },
    "& tr:hover": {
      backgroundColor: "#ddd"
    }
  },
  buttonBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
};

const RestaurantList = ({ initialState, handleDelete, classes }) => {
  const [restaurants, setRestaurants] = useState(initialState);
  useEffect(() => {
    setRestaurants(initialState);
  }, [initialState]);
  return (
    <div className={classes.container}>
      <table className={classes.table}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Vagas disponíveis</th>
            <th>Reservas</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {restaurants && restaurants.length > 0
            ? restaurants.map(restaurant => {
                return (
                  <tr key={`tr-${restaurant.id}`}>
                    <td key={`td-name-${restaurant.id}`}>{restaurant.name}</td>
                    <td key={`td-available-${restaurant.id}`}>
                      {restaurant.available}
                    </td>
                    <td key={`td-reserved-${restaurant.id}`}>
                      {restaurant.reserved.length}
                    </td>
                    <td key={`td-action-${restaurant.id}`}>
                      <div
                        key={`td-buttonBox-${restaurant.id}`}
                        className={classes.buttonBox}
                      >
                        <Button
                          key={`button-detail-${restaurant.id}`}
                          to={`/dashboard/restaurant/details/${restaurant.id}`}
                        >
                          Detalhes
                        </Button>
                        <Button
                          key={`button-edit-${restaurant.id}`}
                          to={`/dashboard/restaurant/edit/${restaurant.id}`}
                        >
                          Editar
                        </Button>
                        <button
                          className={classes.button}
                          key={`button-delete-${restaurant.id}`}
                          onClick={() => handleDelete(restaurant.id)}
                        >
                          Deletar
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default withStyle(styles)(RestaurantList);
