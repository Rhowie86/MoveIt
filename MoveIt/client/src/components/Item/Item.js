import React, { useEffect, useState, useContext } from "react";
import { Card, CardBody, Button } from "reactstrap";
import { ItemContext } from "../../providers/ItemProvider";
import { Link } from "react-router-dom";

export const Item = ({ item, getAllItems, moveId }) => {
  const [checked, setChecked] = useState(item.isLoaded);
  const { editItem } = useContext(ItemContext);

  useEffect(() => {
    if (checked !== item.isLoaded) {
      editItem({ ...item, isLoaded: checked }).then(() => getAllItems(moveId));
    }
  }, [checked]);

  return (
    <>
      <Card className="m-4">
        <CardBody>
          <p>
            <strong>{item.itemName}</strong>
          </p>
          <p>{item.priority.label}</p>
          <p>{item.area.areaName}</p>
          <label for="isMoved">
            Is this item moved?{" "}
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.currentTarget.checked)}
            ></input>
          </label>
          <Button>
            <Link
              color="danger"
              className="a"
              to={`/item/delete/${item.id}/${item.moveId}`}
            >
              Delete Item
            </Link>
          </Button>
        </CardBody>
      </Card>
    </>
  );
};
export default Item;
