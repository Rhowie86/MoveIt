import React, { useContext, useEffect } from "react";
import { PriorityContext } from "../../providers/PriorityProvider";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import Priority from "./Priority";

const PriorityList = () => {
  const { priorities, getAllPriorities } = useContext(PriorityContext);

  useEffect(() => {
    getAllPriorities();
  }, []);

  return (
    <div className="container">
      <p>test</p>
      <div className="row justify-content-center">
        <div className="cards-column">
          {priorities.map((priority) => {
            return <Priority key={priority.id} priority={priority} />;
          })}
        </div>
      </div>
      <Button>
        <Link className="a" to={`/area/create/`}>
          Create New Priority Label
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
export default PriorityList;
