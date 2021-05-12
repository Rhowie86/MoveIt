import React, { useContext, useEffect } from "react";
import { ItemContext } from "../../providers/ItemProvider";
import { Link, useParams } from "react-router-dom";
import { Button } from "reactstrap";
import Item from "./Item";

const ItemList = () => {
  const { items, getAllItems } = useContext(ItemContext);
  const { id } = useParams();

  useEffect(() => {
    getAllItems(id);
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
          {items?.map((item) => {
            return <Item key={item.id} item={item} />;
          })}
        </div>
      </div>
      <Button>
        <Link className="a" to={`/item/${id}/create`}>
          Create New Item
        </Link>
      </Button>
      <Button className="b">
        <Link className="a" to={`/move/${id}`}>
          Go Back To Move
        </Link>
      </Button>
      <Button>
        <Link className="a" to={`/`}>
          Go Home
        </Link>
      </Button>
    </div>
  );
};
export default ItemList;
