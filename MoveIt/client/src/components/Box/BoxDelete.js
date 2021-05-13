import React, { useContext } from "react";
import { BoxContext } from "../../providers/BoxProvider";
import { useParams, useHistory } from "react-router-dom";
import { Button } from "reactstrap";

export const BoxDelete = () => {
  const { deleteBox } = useContext(BoxContext);
  const boxId = parseInt(useParams().id);
  const moveId = useParams().moveId;
  console.log(moveId);
  const history = useHistory();

  const handleDeleteClick = () => {
    deleteBox(boxId).then(() => {
      history.push(`/box/${moveId}`);
    });
  };

  return (
    <>
      <h3>Are you sure you want to delete this box?</h3>

      <Button className="b" onClick={handleDeleteClick}>
        Delete
      </Button>
      <Button className="b" href={`/area/${moveId}`}>
        Go Back
      </Button>
    </>
  );
};
export default BoxDelete;
