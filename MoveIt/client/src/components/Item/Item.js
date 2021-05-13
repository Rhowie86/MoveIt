import React, { useEffect, useState, useContext } from "react";
import { Card, CardBody, Button, Label } from "reactstrap";
import { ItemContext } from "../../providers/ItemProvider";
import { BoxContext } from "../../providers/BoxProvider";
import { Link } from "react-router-dom";

export const Item = ({ item, getAllItems, moveId }) => {
  const [checked, setChecked] = useState(item.isLoaded);
  const [boxed, setBoxed] = useState(item.boxId);
  const [selectedBox, setSelectedBox] = useState({});
  const { editItem } = useContext(ItemContext);
  const { getAllBoxes, boxes, setBoxes } = useContext(BoxContext);

  useEffect(() => {
    if (checked !== item.isLoaded) {
      editItem({ ...item, isLoaded: checked }).then(() => getAllItems(moveId));
    }
  }, [checked]);

  const boxHtml = () => {
    return <p>{item.box.boxName}</p>;
  };

  return (
    <>
      <Card className="m-4">
        <CardBody>
          <p>
            <strong>{item.itemName}</strong>
          </p>
          <p>Priority: {item.priority.label}</p>
          <p>Area Label: {item.area.areaName}</p>
          {item.box ? boxHtml() : null}

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
              color="primary"
              className="a"
              to={`/item/edit/${item.id}/${item.moveId}`}
            >
              Edit Item
            </Link>
          </Button>
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
