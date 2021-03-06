import React, { useContext, useEffect } from "react";
import { MoveContext } from "../../providers/MoveProvider";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
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
      <Button>
        <Link className="a" to={`/move/create/`}>
          Create New Move
        </Link>
      </Button>
      <Button>
        <Link className="a" to={`/`}>
          Go Home
        </Link>
      </Button>
    </div>
  );
};
export default MoveList;
