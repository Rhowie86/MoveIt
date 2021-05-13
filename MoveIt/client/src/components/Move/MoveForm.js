import React, { useState, useContext, useEffect } from "react";
import { Form, Label, Input, Button } from "reactstrap";
import { MoveContext } from "../../providers/MoveProvider";
import { useHistory, useParams } from "react-router-dom";

export const MoveForm = () => {
  const { addMove, editMove, getMove } = useContext(MoveContext);

  const history = useHistory();
  const moveId = parseInt(useParams().id);

  const [move, setMove] = useState({
    Id: "",
    name: "",
    userId: 0,
  });

  const saveMove = () => {
    // e.preventDefault();
    if (moveId) {
      editMove({
        id: moveId,
        name: move.name,
      }).then(() => history.push(`/move/${moveId}`));
    } else {
      addMove({
        name: move.name,
      }).then(() => {
        history.push("/move");
      });
    }
  };

  const handleInputChange = (event) => {
    const newMove = { ...move };
    let selectedVal = event.target.value;
    if (event.target.id.includes("id")) {
      selectedVal = parseInt(selectedVal);
    }
    newMove[event.target.id] = selectedVal;
    setMove(newMove);
  };

  const handleClickSaveMove = (e) => {
    e.preventDefault();
    if (move.name === "" && move.locationName === "") {
      window.alert("Please include a name for your move");
    } else {
      addMove(move).then(() => history.push("/move"));
    }
  };

  useEffect(() => {
    if (moveId) {
      getMove(moveId).then((move) => {
        setMove(move);
      });
    }
  }, []);

  return (
    <>
      <div>
        <Form className="addMoveDiv" onSubmit={handleClickSaveMove}>
          <h3 className="moveForm_title">
            {moveId ? <> Edit Move </> : <> New Move </>}
          </h3>
          <Label for="moveInput">New Move Name</Label>
          <Input
            id="name"
            placeholder="Enter Move Name"
            type="text"
            value={move.name}
            onChange={handleInputChange}
          ></Input>

          <Button className="a" color="info" onClick={saveMove}>
            {moveId ? <> Save Changes </> : <> Add New Move </>}
          </Button>
          <Button className="a" href="/move/">
            Go Back
          </Button>
        </Form>
      </div>
    </>
  );
};
