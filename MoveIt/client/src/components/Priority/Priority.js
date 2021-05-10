import React from "react";
import { Card, CardImg, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";

export const Priority = ({ priority }) => {
  return (
    <>
      <Card className="m-4">
        <CardBody>
          <p>
            <strong>{priority.label}</strong>
          </p>
          <Button>
            <Link className="a" to={`/priority/edit/${priority.id}`}>
              Edit Priority Label
            </Link>
          </Button>
          <Button>
            <Link className="a" to={`/priority/delete/${priority.id}`}>
              Delete Priority Label
            </Link>
          </Button>
        </CardBody>
      </Card>
    </>
  );
};
export default Priority;
