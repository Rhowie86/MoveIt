import React, { useContext } from "react";
import { PriorityContext } from "../../providers/PriorityProvider";
import { useParams, useHistory } from "react-router-dom";
import { Button } from "reactstrap";

export const PriorityDelete = () => {
  const { deletePriority } = useContext(PriorityContext);
  const priorityId = parseInt(useParams().id);
  const history = useHistory();

  const handleDeleteClick = () => {
    deletePriority(priorityId).then(() => {
      history.push(`/priority`);
    });
  };

  return (
    <>
      <h3>Are you sure you want to delete this priority label?</h3>

      <Button className="b" onClick={handleDeleteClick}>
        Confirm
      </Button>
      <Button className="b" href="/priority/">
        Cancel
      </Button>
    </>
  );
};
export default PriorityDelete;
