import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const PriorityContext = React.createContext();

const PriorityProvider = (props) => {
  const { getToken } = useContext(UserProfileContext);
  const [priorities, setPriorities] = useState([]);
  const [priority, setPriority] = useState([]);

  const getAllPriorities = () => {
    return getToken().then((token) =>
      fetch("/api/priority", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json())
    );
  };

  const getPriority = (id) => {
    return getToken().then((token) =>
      fetch(`/api/priority/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json())
    );
  };

  const addPriority = (priority) => {
    return getToken().then((token) =>
      fetch("/api/priority", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(priority),
      })
    );
  };

  const editPriority = (priority) => {
    return getToken().then((token) =>
      fetch(`/api/priority/${priority.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(priority),
      })
    );
  };

  const deletePriority = (id) => {
    return getToken().then((token) =>
      fetch(`/api/priority/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(getAllPriorities)
    );
  };

  return (
    <PriorityContext.Provider
      value={{
        priorities,
        priority,
        setPriorities,
        setPriority,
        getAllPriorities,
        getPriority,
        addPriority,
        editPriority,
        deletePriority,
      }}
    >
      {props.children}
    </PriorityContext.Provider>
  );
};
export default PriorityProvider;
