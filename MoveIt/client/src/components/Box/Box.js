import React from "react";
import { Card, CardImg, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";

export const Box = ({ box }) => {
  return (
    <>
      <Card className="m-4">
        <CardBody>
          <p>
            <strong>{box.boxName}</strong>
          </p>
          <Button>
            <Link className="a" to={`/box/edit/${box.id}`}>
              Edit Box Label
            </Link>
          </Button>
          <Button>
            <Link className="a" to={`/box/delete/${box.id}`}>
              Delete Box
            </Link>
          </Button>
        </CardBody>
      </Card>
    </>
  );
};
export default Box;
