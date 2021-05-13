import React, { useEffect, useContext, useState } from "react";
import { Card, CardBody, Button } from "reactstrap";
import { MoveContext } from "../../providers/MoveProvider";
import { useParams, Link } from "react-router-dom";

export const MoveDetails = () => {
  const [move, setMove] = useState({});
  const { getMove } = useContext(MoveContext);
  const { id } = useParams();

  useEffect(() => {
    getMove(id).then(setMove);
  }, []);

  return (
    <div>
      {move.id !== undefined ? (
        <Card className="m-4">
          <CardBody>
            <p className="text-left px-2">{move.userProfile.displayName}</p>
            <p>
              <strong>{move.name}</strong>
            </p>
            <p>{move.locationName}</p>
          </CardBody>
          <Button className="b">
            <Link className="a" to={`/item/${move.id}`}>
              Items on this move
            </Link>
          </Button>

          <Button className="b">
            <Link className="a" to={`/box/${move.id}`}>
              Boxes
            </Link>
          </Button>

          <Button className="b">
            <Link className="a" to={`/move/edit/${move.id}`}>
              Edit
            </Link>
          </Button>
          <Button className="b">
            <Link className="a" to={`/move/delete/${move.id}`}>
              Delete
            </Link>
          </Button>

          <Button className="b">
            <Link className="a" to={`/`}>
              Go Home
            </Link>
          </Button>
        </Card>
      ) : null}
    </div>
  );
};
