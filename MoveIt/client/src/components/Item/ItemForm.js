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
  ButtonGroup,
} from "reactstrap";

import { ItemContext } from "../../providers/ItemProvider";
import { BoxContext } from "../../providers/BoxProvider";
import { AreaContext } from "../../providers/AreaProvider";
import { PriorityContext } from "../../providers/PriorityProvider";
import { useHistory, useParams, Link } from "react-router-dom";
import { ToggleButton } from "react-bootstrap";

const ItemForm = () => {
  const { addItem, editItem, getItem } = useContext(ItemContext);
  const { addBox, editBox, getAllBoxes } = useContext(BoxContext);
  const { addArea, editArea, getAllAreas } = useContext(AreaContext);
  const { getAllPriorities } = useContext(PriorityContext);
  const [boxes, setBoxes] = useState([]);
  const [areas, setAreas] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [checked, setChecked] = useState(false);

  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    getAllBoxes(id)
      .then(setBoxes)
      .then(() => getAllAreas())
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

  const [itemName, setItemName] = useState("");
  const [boxId, setBoxId] = useState(0);
  const [ItemAreaId, setItemAreaId] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userId, setUserId] = useState(0);
  const [moveId, setMoveId] = useState(0);
  const [priorityId, setPriorityId] = useState(0);

  //   const saveItem = () => {
  //       if(id){
  //           const newItem = {
  //               ...item
  //           }
  //           newItem.Id = id
  //           newItem.ItemName = ""
  //       }
  //   }

  const resetForm = () => {
    setItemName("");
    setBoxId(null);
    setItemAreaId(0);
    setUserId(0);
    setMoveId(0);
    setPriorityId(0);
    toggleModal();
  };

  const submit = () => {
    const newItem = {
      ItemName: itemName,
      BoxId: bodId,
      ItemAreaId: ItemAreaId,
      IsLoaded: isLoaded,

      MoveId: id,
      PriorityId: priorityId,
    };

    addItem(newItem).then(setItem);
  };

  return (
    <main>
      <div className="container pt-4">
        <div className="row justify-content-center">
          <Card className="col-sm-12 col-lg-6">
            <CardBody>
              <Form>
                <FormGroup>
                  <Label for="item">Item Name</Label>
                  <Input
                    type="text"
                    id="itemName"
                    onChange={(e) => setItemName(e.target.value)}
                    value={itemName}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="boxes">
                    Box
                    <select
                      id="boxes"
                      onChange={(e) => setBoxId(e.target.value)}
                      value={boxId}
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
                  <select
                    id="area"
                    onChange={(e) => setItemAreaId(e.target.value)}
                    value={ItemAreaId}
                  >
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
                <FormGroup>
                  <Label for="itemArea">Priority Label</Label>
                  <select
                    id="priority"
                    onChange={(e) => setPriorityId(e.target.value)}
                    value={priorityId}
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
                      checked={checked}
                      value="1"
                      onChange={(e) =>
                        setChecked(e.currentTarget.checked) &&
                        setIsLoaded(e.target.value)
                      }
                    ></input>
                  </label>
                </FormGroup>
              </Form>
              <Button color="success" disabled={isLoading} onClick={submit}>
                Add Item
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>

      <div>
        <Modal isOpen={modal} toggle={toggleModal} className="modal-dialog">
          <ModalHeader toggle={toggleModal}>Item Added</ModalHeader>
          <ModalBody>
            <label>Would you like to add another Item?</label>
          </ModalBody>
          <ModalFooter>
            <Button className="success" onClick={resetForm}>
              {" "}
              Yes.{" "}
            </Button>{" "}
            <Button className="primary">
              <Link className="a" to={`/move`}>
                No.
              </Link>
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </main>
  );
};
export default ItemForm;
