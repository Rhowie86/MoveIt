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

  return (
    <MoveContext.Provider
      value={{ moves, move, getAllMoves, setMove, setMoves }}
    >
      {props.children}
    </MoveContext.Provider>
  );
};
export default MoveProvider;
