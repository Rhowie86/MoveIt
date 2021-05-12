import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const ItemContext = React.createContext();

const ItemProvider = (props) => {
  const { getToken } = useContext(UserProfileContext);
  const [items, setItems] = useState([]);
  const [item, setItem] = useState([]);

  const getAllItems = (id) => {
    return getToken()
      .then((token) =>
        fetch(`/api/item/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => res.json())
      )
      .then(setItems);
  };

  const getItem = (id) => {
    return getToken().then((token) =>
      fetch(`/api/item/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json())
    );
  };

  const addItem = (item) => {
    return getToken().then((token) =>
      fetch("/api/item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(item),
      })
    );
  };

  const editItem = (item) => {
    return getToken().then((token) =>
      fetch(`/api/item/${item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(item),
      })
    );
  };

  const deleteItem = (id) => {
    return getToken().then((token) =>
      fetch(`/api/item/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(getAllItems)
    );
  };

  return (
    <ItemContext.Provider
      value={{
        items,
        item,
        setItems,
        setItem,
        getAllItems,
        getItem,
        addItem,
        editItem,
        deleteItem,
      }}
    >
      {props.children}
    </ItemContext.Provider>
  );
};
export default ItemProvider;
