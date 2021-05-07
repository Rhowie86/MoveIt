import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const LocationContext = React.createContext();

const LocationProvider = (props) => {
  const { getToken } = useContext(UserProfileContext);
  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState([]);

  const getAllLocations = () => {
    return getToken()
      .then((token) =>
        fetch("/api/location", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => res.json())
      )
      .then(setLocations);
  };

  const getLocation = (id) => {
    return getToken().then((token) =>
      fetch(`/api/location/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json())
    );
  };

  const addLocation = (location) => {
    return getToken().then((token) =>
      fetch("/api/location", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(location),
      })
    );
  };

  const editLocation = (location) => {
    return getToken().then((token) =>
      fetch(`/api/location/${location.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(location),
      })
    );
  };

  const deleteLocation = (id) => {
    return getToken().then((token) =>
      fetch(`/api/location/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(getAllLocations)
    );
  };

  return (
    <LocationContext.Provider
      value={{
        locations,
        location,
        getAllLocations,
        getLocation,
        addLocation,
        editLocation,
        deleteLocation,
      }}
    >
      {props.children}
    </LocationContext.Provider>
  );
};
export default LocationProvider;
