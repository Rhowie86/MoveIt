import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const BoxContext = React.createContext();

const BoxProvider = (props) => {
  const { getToken } = useContext(UserProfileContext);
  const [boxes, setBoxes] = useState([]);
  const [box, setBox] = useState([]);

  const getAllBoxes = (id) => {
    return getToken().then((token) =>
      fetch(`/api/box/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json())
    );
  };

  const getBox = (id) => {
    return getToken().then((token) =>
      fetch(`/api/box/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json())
    );
  };

  const addBox = (box) => {
    return getToken().then((token) =>
      fetch("/api/box", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(box),
      })
    );
  };

  const editBox = (box) => {
    return getToken().then((token) =>
      fetch(`/api/box/${box.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(box),
      })
    );
  };

  const deleteBox = (id) => {
    return getToken().then((token) =>
      fetch(`/api/box/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(getAllBoxes)
    );
  };

  return (
    <BoxContext.Provider
      value={{
        boxes,
        box,
        setBoxes,
        setBox,
        getAllBoxes,
        getBox,
        addBox,
        editBox,
        deleteBox,
      }}
    >
      {props.children}
    </BoxContext.Provider>
  );
};
export default BoxProvider;
