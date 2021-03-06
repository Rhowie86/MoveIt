import React, { useState, useContext } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";

export const MoveContext = React.createContext();

export const MoveProvider = (props) => {
  const { getToken } = useContext(UserProfileContext);
  const [moves, setMoves] = useState([]);
  const [move, setMove] = useState([]);

  const getAllMoves = () => {
    return getToken()
      .then((token) =>
        fetch("/api/move", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => res.json())
      )
      .then(setMoves);
  };

  const getMove = (id) => {
    return getToken().then((token) =>
      fetch(`/api/move/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json())
    );
  };

  const addMove = (move) => {
    return getToken().then((token) =>
      fetch("/api/move", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(move),
      })
    );
  };

  const editMove = (move) => {
    return getToken().then((token) =>
      fetch(`/api/move/${move.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(move),
      })
    );
  };

  const deleteMove = (id) => {
    return getToken().then((token) =>
      fetch(`/api/move/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(getAllMoves)
    );
  };

  return (
    <MoveContext.Provider
      value={{
        moves,
        move,
        getAllMoves,
        getMove,
        addMove,
        editMove,
        setMove,
        setMoves,
        deleteMove,
      }}
    >
      {props.children}
    </MoveContext.Provider>
  );
};
export default MoveProvider;
