import React, { useContext } from "react";
import { LocationContext } from "../../providers/LocationProvider";
import { useParams, useHistory } from "react-router-dom";
import { Button } from "reactstrap";

export const LocationDelete = () => {
  const { deleteLocation } = useContext(LocationContext);
  const locationId = parseInt(useParams().id);
  const history = useHistory();

  const handleDeleteClick = () => {
    deleteLocation(locationId).then(() => {
      history.push(`/location`);
    });
  };

  return (
    <>
      <h3>Are you sure you want to delete this location?</h3>

      <Button className="b" onClick={handleDeleteClick}>
        Confirm
      </Button>
      <Button className="b" href="/location/">
        Cancel
      </Button>
    </>
  );
};
export default MoveDelete;
