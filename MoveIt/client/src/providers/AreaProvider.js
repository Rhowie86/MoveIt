import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const AreaContext = React.createContext();

const AreaProvider = (props) => {
  const { getToken } = useContext(UserProfileContext);
  const [areas, setAreas] = useState([]);
  const [area, setArea] = useState([]);

  const getAllAreas = () => {
    return getToken().then((token) =>
      fetch("/api/area", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json())
    );
  };

  const getAreaByUser = () => {
    return getToken().then((token) =>
      fetch(`/api/area/getAreaByUserId`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json())
    );
  };

  const getArea = (id) => {
    return getToken().then((token) =>
      fetch(`/api/area/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json())
    );
  };

  const addArea = (area) => {
    return getToken().then((token) =>
      fetch("/api/area", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(area),
      })
    );
  };

  const editArea = (area) => {
    return getToken().then((token) =>
      fetch(`/api/area/${area.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(area),
      })
    );
  };

  const deleteArea = (id) => {
    return getToken().then((token) =>
      fetch(`/api/area/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(getAllAreas)
    );
  };

  return (
    <AreaContext.Provider
      value={{
        areas,
        area,
        setAreas,
        setArea,
        getAllAreas,
        getAreaByUser,
        getArea,
        addArea,
        editArea,
        deleteArea,
      }}
    >
      {props.children}
    </AreaContext.Provider>
  );
};
export default AreaProvider;
