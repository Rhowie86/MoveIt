import React, { useEffect, useContext, useState } from "react";
import { Card, CardImg, CardBody, Button } from "reactstrap";
import { LocationContext } from "../../providers/LocationProvider";
import { useParams, Link } from "react-router-dom";

export const LocationDetails = () => {
  const [location, setLocation] = useState();
  const { getMove } = useContext(LocationContext);
  const { id } = useParams();

  useEffect(() => {
    getLocationById(id).then(setLocation);
  }, []);

  return (
    <div>
      <Card className="m-4">
        <CardBody>
          <p>
            <strong>{location.locationName}</strong>
          </p>

          {/* Item List May Go Here */}
        </CardBody>
        <Button className="b">
          <Link className="a" to={`/location/edit/${location.id}`}>
            Edit
          </Link>
        </Button>
        <Button className="b">
          <Link className="a" to={`/location/delete/${location.id}`}>
            Delete
          </Link>
        </Button>
        <Button className="b">
          <Link className="a" to={`/location`}>
            Go Back
          </Link>
        </Button>
      </Card>
    </div>
  );
};
