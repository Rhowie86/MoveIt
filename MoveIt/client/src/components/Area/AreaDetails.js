import React, { useEffect, useContext, useState } from "react";
import { Card, CardImg, CardBody, Button } from "reactstrap";
import { AreaContext } from "../../providers/AreaProvider";
import { useParams, Link } from "react-router-dom";

export const AreaDetails = () => {
  const [area, setArea] = useState();
  const { getArea } = useContext(AreaContext);
  const { id } = useParams();

  useEffect(() => {
    getArea(id).then(setArea);
  }, []);

  return (
    <div>
      <Card className="m-4">
        <CardBody>
          <p>
            <strong>{area.areaName}</strong>
          </p>

          {/* Item List May Go Here */}
        </CardBody>
        <Button className="b">
          <Link className="a" to={`/area/edit/${area.id}`}>
            Edit
          </Link>
        </Button>
        <Button className="b">
          <Link className="a" to={`/area/delete/${area.id}`}>
            Delete
          </Link>
        </Button>
        <Button className="b">
          <Link className="a" to={`/area`}>
            Go Back
          </Link>
        </Button>
      </Card>
    </div>
  );
};
export default AreaDetails;
