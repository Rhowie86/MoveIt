import React, { useContext } from "react";
import { AreaContext } from "../../providers/AreaProvider";
import { useParams, useHistory } from "react-router-dom";
import { Button } from "reactstrap";

export const AreaDelete = () => {
  const { deleteArea } = useContext(AreaContext);
  const areaId = parseInt(useParams().id);
  const history = useHistory();

  const handleDeleteClick = () => {
    deleteArea(areaId).then(() => {
      history.push(`/area`);
    });
  };

  return (
    <>
      <h3>Are you sure you want to delete this area label?</h3>

      <Button className="b" onClick={handleDeleteClick}>
        Confirm
      </Button>
      <Button className="b" href="/area/">
        Cancel
      </Button>
    </>
  );
};
export default AreaDelete;
