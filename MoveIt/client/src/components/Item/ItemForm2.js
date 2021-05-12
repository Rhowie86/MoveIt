import React, { useState, useContext, useEffect } from "react";
import { Form, Label, Input, Button } from "reactstrap";
import { AreaContext } from "../../providers/AreaProvider";
import { ItemContext } from "../../providers/ItemProvider";
import { PriorityContext } from "../../providers/PriorityProvider";
import { BoxContext } from "../../providers/BoxProvider";
import { MoveContext } from "../../providers/MoveProvider";
import { useHistory, useParams } from "react-router-dom";

export const AreaForm = () => {
  const { addItem, editItem, getAllItems } = useContext(ItemContext);

  const { area, getAllAreas } = useContext(AreaContext);
  const { priority, getAllPriorities } = useContext(PriorityContext);
  const { box, getAllBoxes, getBox } = useContext(BoxContext);
  const { move, getAllMoves, getMove } = useContext(MoveConext);

  const [item, setItem] = useState({
    ItemName: "",
    BoxId: 0,
    ItemAreaId: 0,
    IsLoaded: false,
    UserId: 0,
    MoveId: 0,
    PriorityIt: 0,
  });

  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    getMove(id).then(getBox(move.id)).then(getAllPriorities).then(getArea);
  });

  const history = useHistory();
  const areaId = parseInt(useParams().id);

  const saveArea = () => {
    if (areaId) {
      editArea({
        id: areaId,
        AreaName: area.areaName,
        UserId: userId.Id,
      }).then(() => history.push(`/area/${areaId}`));
    } else {
      addArea({
        AreaName: area.areaName,
        UserId: userId.id,
      }).then(() => {
        history.push("/area");
      });
    }
  };

  const handleInputChange = (event) => {
    const newArea = { ...area };
    let selectedVal = event.target.value;
    if (event.target.id.includes("id")) {
      selectedVal = parseInt(selectedVal);
    }
    newArea[event.target.id] = selectedVal;
    setArea(newArea);
  };

  const handleClickSaveArea = (e) => {
    e.preventDefault();
    if (area.areaName === "") {
      window.alert("Please include an area label");
    } else {
      addArea(area).then(() => history.push("/area"));
    }
  };

  useEffect(() => {
    if (areaId) {
      getArea(areaId).then((area) => {
        setArea(area);
      });
    }
  }, []);

  return (
    <>
      <div>
        <Form className="addAreaDiv" onSubmit={handleClickSaveArea}>
          <h3 className="areaForm_title">
            {areaId ? <> Edit Area Label </> : <> New Area Label </>}
          </h3>
          <Label for="areaInput">New Area Label</Label>
          <Input
            id="areaName"
            placeholder="Enter Area Label"
            type="text"
            onChange={handleInputChange}
          ></Input>
          <Button className="a" color="info" onClick={saveArea}>
            {areaId ? <> Save Changes </> : <> Add New Area Label </>}
          </Button>
          <Button className="a" href="/area/">
            Go Back
          </Button>
        </Form>
      </div>
    </>
  );
};
export default AreaForm;
