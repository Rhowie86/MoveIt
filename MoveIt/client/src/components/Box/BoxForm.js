import React, { useState, useContext, useEffect } from "react";
import { Form, Label, Input, Button } from "reactstrap";
import { BoxContext } from "../../providers/BoxProvider";
import { useHistory, useParams } from "react-router-dom";

const BoxForm = () => {
  const { addBox, getBox } = useContext(BoxContext);

  const history = useHistory();
  const boxId = parseInt(useParams().id);

  const [box, setBox] = useState({
    Id: 0,
    boxName: "",
    moveId: 0,
  });

  const saveBox = () => {
    addBox({
      boxName: box.boxName,
      moveId: boxId,
    }).then(() => {
      history.push(`/box/${boxId}`);
    });
  };
  //   };

  const handleInputChange = (event) => {
    const newBox = { ...box };
    let selectedVal = event.target.value;
    if (event.target.id.includes("id")) {
      selectedVal = parseInt(selectedVal);
    }
    newBox[event.target.id] = selectedVal;
    setBox(newBox);
  };

  const handleClickSaveBox = (e) => {
    e.preventDefault();
    if (box.boxName === "") {
      window.alert("Please include a name for the box");
    } else {
      addBox(box).then(() => history.push(`/box/${boxId}`));
    }
  };

  useEffect(() => {
    if (boxId) {
      getBox(boxId).then((box) => {
        setBox(box);
      });
    }
  }, []);

  return (
    <>
      <div>
        <Form className="addBoxDiv" onSubmit={handleClickSaveBox}>
          <h3 className="BoxForm_title">Add A Box</h3>
          <Label for="boxInput">New Box Name</Label>
          <Input
            id="boxName"
            placeholder="Enter Box Name"
            type="text"
            onChange={handleInputChange}
          ></Input>
          <Button className="a" color="info" onClick={saveBox}>
            {boxId ? <> Save Changes </> : <> Add New Box </>}
          </Button>
          <Button className="a" href="/box/">
            Go Back
          </Button>
        </Form>
      </div>
    </>
  );
};
export default BoxForm;
