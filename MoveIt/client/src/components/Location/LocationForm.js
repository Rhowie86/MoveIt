import React, { useState, useContext, useEffect } from "react";
import { Form, Label, Input, Button } from "reactstrap";
import { LocationContext } from "../../providers/LocationProvider";
import { useHistory, useParams } from "react-router-dom";

export const LocationForm = () => {
  const { addLocation, editLocation, getLocation } = useContext(
    LocationContext
  );

  const history = useHistory();
  const locationId = parseInt(useParams().id);

  const [location, setLocation] = useState({
    Id: "",
    LocationName: "",
  });

  const saveLocation = () => {
    if (locationId) {
      editLocation({
        id: locationId,
        LocationName: location.LocationName,
      }).then(() => history.push(`/location/${locationId}`));
    } else {
      addLocation({
        LocationName: location.LocationName,
      }).then(() => {
        history.push("/location");
      });
    }
  };

  const handleInputChange = (event) => {
    const newLocation = { ...location };
    let selectedVal = event.target.value;
    if (event.target.id.includes("id")) {
      selectedVal = parseInt(selectedVal);
    }
    newLocation[event.target.id] = selectedVal;
    setLocation(newLocation);
  };

  const handleClickSaveLocation = (e) => {
    e.preventDefault();
    if (location.LocationName === "") {
      window.alert("Please include a location name");
    } else {
      addLocation(location).then(() => history.push("/location"));
    }
  };

  useEffect(() => {
    if (locationId) {
      getLocation(locationId).then((location) => {
        setLocation(location);
      });
    }
  }, []);

  return (
    <>
      <div>
        <Form className="addLocationDiv" onSubmit={handleClickSaveLocation}>
          <h3 className="locationForm_title">
            {locationId ? <> Edit Location </> : <> New Location </>}
          </h3>
          <Label for="locationInput">New Location Name</Label>
          <Input
            id="Name"
            placeholder="Enter Location Name"
            type="text"
            onChange={handleInputChange}
          ></Input>
          <Button className="a" color="info" onClick={saveLocation}>
            {locationId ? <> Save Changes </> : <> Add New Location </>}
          </Button>
          <Button className="a" href="/location/">
            Go Back
          </Button>
        </Form>
      </div>
    </>
  );
};
