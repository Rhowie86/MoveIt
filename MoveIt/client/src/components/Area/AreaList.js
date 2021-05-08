import React, { useContext, useEffect } from "react";
import { AreaContext } from "../../providers/AreaProvider";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import Area from "./Area";

const AreaList = () => {
  const { areas, getAllAreas } = useContext(AreaContext);

  useEffect(() => {
    getAllAreas();
  }, []);

  return (
    <div className="container">
      <p>test</p>
      <div className="row justify-content-center">
        <div className="cards-column">
          {areas.map((area) => {
            return <Area key={area.id} area={area} />;
          })}
        </div>
      </div>
      <Button>
        <Link className="a" to={`/area/create/`}>
          Create New Area Label
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
export default AreaList;
