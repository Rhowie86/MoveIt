import React, { useContext, useState } from "react";
import { ItemContext } from "../../providers/ItemProvider";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button } from "reactstrap";

export const ItemDelete = () => {
  const { deleteItem } = useContext(ItemContext);
  const itemId = useParams().id;
  const moveId = useParams().moveId;
  const history = useHistory();

  const handleDelete = () => {
    deleteItem(itemId).then(() => {
      history.push(`/item/${moveId}`);
    });
  };

  return (
    <>
      <h2>Are you sure you want to delete this Item?</h2>
      <Button className="a" onClick={handleDelete}>
        Delete
      </Button>
      <Button className="a" href={`/item/${moveId}`}>
        Go Back
      </Button>
    </>
  );
};
export default ItemDelete;
