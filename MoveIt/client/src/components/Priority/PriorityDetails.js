import React, { useEffect, useContext, useState } from "react";
import { Card, CardImg, CardBody, Button } from "reactstrap";
import { PriorityContext } from "../../providers/PriorityProvider";
import { useParams, Link } from "react-router-dom";

export const PriorityDetails = () => {
  const [priority, setPriority] = useState();
  const { getPriority } = useContext(PriorityContext);
  const { id } = useParams();

  useEffect(() => {
    getPriority(id).then(setPriority);
  }, []);

  return (
    <div>
      <Card className="m-4">
        <CardBody>
          <p>
            <strong>{priority.label}</strong>
          </p>

          {/* Item List May Go Here */}
        </CardBody>
        <Button className="b">
          <Link className="a" to={`/priority/edit/${priority.id}`}>
            Edit
          </Link>
        </Button>
        <Button className="b">
          <Link className="a" to={`/priority/delete/${priority.id}`}>
            Delete
          </Link>
        </Button>
        <Button className="b">
          <Link className="a" to={`/priority`}>
            Go Back
          </Link>
        </Button>
      </Card>
    </div>
  );
};
export default PriorityDetails;
