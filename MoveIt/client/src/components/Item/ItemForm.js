import React, { useState, useContext, useEffect } from "react";
import {
  Form,
  FormGroup,
  Card,
  CardBody,
  Label,
  Input,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "reactstrap";
import AreaForm from "../Area/AreaForm";
import { ItemContext } from "../../providers/ItemProvider";
import { MoveContext } from "../../providers/MoveProvider";
import { BoxContext } from "../../providers/BoxProvider";
import { AreaContext } from "../../providers/AreaProvider";
import { PriorityContext } from "../../providers/PriorityProvider";
import { useHistory, useParams, Link } from "react-router-dom";

const ItemForm = () => {
  const { addItem, editItem, getItem } = useContext(ItemContext);
  const { addBox, editBox, getAllBoxes } = useContext(BoxContext);
  const { addArea, editArea, getAreaByUser } = useContext(AreaContext);
  const { getMove } = useContext(MoveContext);
  const { getAllPriorities } = useContext(PriorityContext);
  const [move, setMove] = useState(null);
  const [boxes, setBoxes] = useState([]);
  const [areas, setAreas] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [checked, setChecked] = useState(false);
  const [visible, setVisible] = useState(false);

  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    getAllBoxes(id)
      .then(setBoxes)
      //   .then(() => getAllAreas())
      //   .then(setAreas)
      .then(getAreaByUser)
      .then(setAreas)
      .then(() => getAllPriorities())
      .then(setPriorities);
  }, []);

  const [item, setItem] = useState({
    Id: "",
    ItemName: "",
    BoxId: null,
    ItemAreaId: 0,
    IsLoaded: false,
    UserId: 0,
    MoveId: 0,
    PriorityId: 0,
  });

  const handleInputChange = (event) => {
    const newItem = { ...item };
    let selectedVal = event.target.value;
    if (event.target.id.includes("id")) {
      selectedVal = parseInt(selectedVal);
    }
    newItem[event.target.id] = selectedVal;
    setItem(newItem);
  };

  const handleClick = (e) => {
    const newItem = { ...item };
    newItem.IsLoaded = e.target.checked;
    setItem(newItem);
  };

  const submit = () => {
    const newItem = {
      ItemName: item.ItemName,
      BoxId: item.BoxId !== null ? parseInt(item.BoxId) : null,
      ItemAreaId: item.ItemAreaId,
      IsLoaded: item.IsLoaded,
      MoveId: id,
      PriorityId: item.PriorityId,
    };

    addItem(newItem).then(() => history.push(`/item/${id}`));
  };

  useEffect(() => {
    if (id) {
      getMove(id).then((apiMove) => {
        getAreaByUser(apiMove.userId).then(setAreas);
      });
    }
  }, [id]);

  return (
    <main>
      {visible ? (
        <AreaForm visibility={setVisible} setAreas={setAreas} />
      ) : (
        <div></div>
      )}
      <div className="container pt-4">
        <div className="row justify-content-center">
          <Card className="col-sm-12 col-lg-6">
            <CardBody>
              <Form>
                <FormGroup>
                  <Label for="item">Item Name</Label>
                  <Input
                    type="text"
                    id="ItemName"
                    onChange={handleInputChange}
                    value={item.ItemName}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="boxes">
                    Box
                    <select
                      id="BoxId"
                      onChange={handleInputChange}
                      value={item.BoxId}
                    >
                      <option value="" selected hidden>
                        Does this go in a box?
                      </option>
                      {boxes?.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.boxName}
                        </option>
                      ))}
                    </select>
                  </Label>
                </FormGroup>

                <FormGroup>
                  <Label for="itemArea">Area Label</Label>
                  <select id="ItemAreaId" onChange={handleInputChange}>
                    <option value="" selected hidden>
                      What area label would you like to add?
                    </option>
                    {areas?.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.areaName}
                      </option>
                    ))}
                  </select>
                </FormGroup>

                <Button
                  onClick={() => {
                    setVisible(true);
                  }}
                >
                  Add an area label
                </Button>

                <FormGroup>
                  <Label for="itemArea">Priority Label</Label>
                  <select
                    id="PriorityId"
                    onChange={handleInputChange}
                    value={item.priorityId}
                  >
                    <option value="" selected hidden>
                      What's this item's priority'?
                    </option>
                    {priorities?.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </FormGroup>
                <FormGroup>
                  <label for="isMoved">
                    Is this item moved?{" "}
                    <input
                      type="checkbox"
                      id="IsLoaded"
                      value={item.IsLoaded}
                      onChange={handleClick}
                    ></input>
                  </label>
                </FormGroup>
              </Form>
              <Button color="success" disabled={isLoading} onClick={submit}>
                Add Item
              </Button>
              <Button className="b">
                <Link className="a" to={`/move/${id}`}>
                  Go Back To Move
                </Link>
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    </main>
  );
};
export default ItemForm;
