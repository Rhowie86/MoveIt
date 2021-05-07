import React, { useContext, useEffect } from "react";
import { LocationContext } from "../../providers/LocationProvider";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import Location from "./Location";

const LocationList = () => {
  const { locations, getAllLocations } = useContext(LocationContext);

  useEffect(() => {
    getAllLocations();
  }, []);

  return (
    <div className="container">
      <p>test</p>
      <div className="row justify-content-center">
        <div className="cards-column">
          {locations.map((location) => {
            return <Location key={location.id} location={location} />;
          })}
        </div>
      </div>
      <Button>
        <Link className="a" to={`/location/create/`}>
          Create New Location
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
export default LocationList;
