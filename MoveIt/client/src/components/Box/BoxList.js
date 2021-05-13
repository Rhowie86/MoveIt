import React, { useContext, useEffect } from "react";
import { BoxContext } from "../../providers/BoxProvider";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import Box from "./Box";
import { useParams } from "react-router-dom";

const BoxList = () => {
  const { boxes, setBoxes, getAllBoxes } = useContext(BoxContext);
  const { id } = useParams();

  useEffect(() => {
    getAllBoxes(id).then(setBoxes);
  }, []);

  return (
    <div>
      <Button>
        <Link className="a" to={`/box/${id}/create/`}>
          Create New Box
        </Link>
      </Button>
      <Button className="b">
        <Link className="a" to={`/move/${id}`}>
          Go Back To Move
        </Link>
      </Button>
      <Button>
        <Link className="a" to={`/`}>
          Go Home
        </Link>
      </Button>
      <div className="container">
        <div className="row justify-content-center">
          <div className="cards-column">
            {boxes.map((box) => {
              return <Box key={box.id} box={box} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default BoxList;
