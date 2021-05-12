import React, { useContext, useEffect } from "react";
import { BoxContext } from "../../providers/BoxProvider";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import Box from "./Box";

const BoxList = () => {
  const { boxes, getAllBoxes } = useContext(BoxContext);

  useEffect(() => {
    getAllBoxes();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
          {boxes.map((box) => {
            return <Box key={box.id} box={Box} />;
          })}
        </div>
      </div>
      <Button>
        <Link className="a" to={`/box/create/`}>
          Create New Box
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
export default BoxList;
