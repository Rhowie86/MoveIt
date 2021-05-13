import React from "react";
import { Card, CardImg, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";

export const Move = ({ move }) => {
  console.log(move);
  return (
    <Card className="m-4">
      <p className="text-left px-2">{move.userProfile.displayName}'s Move</p>
      <CardBody>
        <p>
          <Link to={`/move/${move.id}`}>
            <strong>{move.name}</strong>
          </Link>
        </p>
        <p>{move.nocationName}</p>
      </CardBody>
    </Card>
  );
};

export default Move;
