import React, { useEffect, useState, useContext } from "react";
import { Card, CardImg, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { ItemContext } from "../../providers/ItemProvider";
import Item from "../Item/Item";

export const Box = ({ box }) => {
  //   const [boxItems, setBoxItems] = useState(box.boxId);
  const { items, setItems, getBoxItems } = useContext(ItemContext);

  useEffect(() => {
    getBoxItems(box.id).then(setItems);
  }, []);

  return (
    <>
      <Card className="m-4">
        <CardBody>
          <p>
            <strong>{box.boxName}</strong>
          </p>
          <div>
            {items?.map((item) => {
              return <Item Key={item.id} item={item} />;
            })}
          </div>
          <Button>
            <Link className="a" to={`/box/edit/${box.id}`}>
              Edit Box Label
            </Link>
          </Button>
          <Button>
            <Link className="a" to={`/box/delete/${box.id}/${box.moveId}`}>
              Delete Box
            </Link>
          </Button>
        </CardBody>
      </Card>
    </>
  );
};
export default Box;
