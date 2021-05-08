import React from "react";
import { Card, CardImg, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";

export const Area = ({ area }) => {
  return (
    <>
      <Card className="m-4">
        <CardBody>
          <p>
            <strong>{area.areaName}</strong>
          </p>
          <Button>
            <Link className="a" to={`/area/edit/${area.id}`}>
              Edit Area Label
            </Link>
          </Button>
          <Button>
            <Link className="a" to={`/area/delete/${area.id}`}>
              Delete Area Label
            </Link>
          </Button>
        </CardBody>
      </Card>
    </>
  );
};
export default Area;
