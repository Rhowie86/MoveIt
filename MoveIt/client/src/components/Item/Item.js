import React from "react";
import { Card, CardImg, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";

export const Item = ({ item }) => {
  return (
    <>
      <Card className="m-4">
        <CardBody>
          <p>
            <strong>{item.itemName}</strong>
          </p>
          <p>{item.priority.label}</p>
          <p>{item.area.areaName}</p>
        </CardBody>
      </Card>
    </>
  );
};
export default Item;
