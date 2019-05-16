import React, { useState, useEffect } from "react";
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

const ReserveList = ({ initialState, handleDelete, isDetail, classes }) => {
  const [reserves, setReserves] = useState(initialState);

  useEffect(() => {
    setReserves(initialState);
  }, [initialState]);
  return (
    <div className={classes.container}>
      <table className={classes.table}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Sobrenome</th>
            <th>CPF</th>
            <th>RG</th>
            <th>Data de nascimento</th>
            <th>Quantidade</th>
            {!isDetail ? <th>Ações</th> : null}
          </tr>
        </thead>
        <tbody>
          {reserves && reserves.length > 0
            ? reserves.map(reserve => {
                return (
                  <tr key={`tr-${reserve.id}`}>
                    <td key={`td-name-${reserve.id}`}>{reserve.name}</td>
                    <td key={`td-lastName-${reserve.id}`}>
                      {reserve.lastName}
                    </td>
                    <td key={`td-cpf-${reserve.id}`}>{reserve.cpf}</td>
                    <td key={`td-rg-${reserve.id}`}>{reserve.rg}</td>
                    <td key={`td-birthday-${reserve.id}`}>
                      {reserve.birthday}
                    </td>
                    <td key={`td-quantity-${reserve.id}`}>
                      {reserve.quantity}
                    </td>
                    {!isDetail ? (
                      <td>
                        <div className={classes.buttonBox}>
                          <button
                            className={classes.button}
                            onClick={() => handleDelete(reserve.id)}
                            key={`td-delete-${reserve.id}`}
                          >
                            Deletar
                          </button>
                        </div>
                      </td>
                    ) : null}
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default withStyle(styles)(ReserveList);
