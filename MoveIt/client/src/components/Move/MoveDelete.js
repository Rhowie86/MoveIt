import React, { useContext } from "react";
import { MoveContext } from "../../providers/MoveProvider";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "reactstrap";

export const MoveDelete = () => {
  const { deleteMove } = useContext(MoveContext);
  const moveId = parseInt(useParams().id);
  const history = useHistory();

  const handleDeleteClick = () => {
    deleteMove(moveId).then(() => {
      history.push(`/move`);
    });
  };

  return (
    <>
      <h3>Are you sure you want to delete this move?</h3>

      <Button className="b" onClick={handleDeleteClick}>
        Confirm
      </Button>
      <Button className="b" href="/post/">
        Cancel
      </Button>
    </>
  );
};
export default MoveDelete;
