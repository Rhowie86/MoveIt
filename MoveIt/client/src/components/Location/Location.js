import React from "react";
import { Card, CardImg, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";

export const Location = ({ location }) => {
  return (
    <>
      <Card className="m-4">
        <CardBody>
          <p>
            <strong>{location.locationName}</strong>
          </p>
          <Button>
            <Link className="a" to={`/location/edit/${location.id}`}>
              Edit Location
            </Link>
          </Button>
          <Button>
            <Link className="a" to={`/location/delete/${location.id}`}>
              Delete Location
            </Link>
          </Button>
        </CardBody>
      </Card>
    </>
  );
};
export default Location;
