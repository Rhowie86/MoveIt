import React, { useContext, useEffect } from "react";
import { MoveContext } from "../../providers/MoveProvider";
import Move from "./Move";

export const MoveList = () => {
  const { moves, getAllMoves } = useContext(MoveContext);

  useEffect(() => {
    getAllMoves();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
          {moves.map((move) => {
            return <Move key={move.id} move={move} />;
          })}
        </div>
      </div>
    </div>
  );
};
export default MoveList;
