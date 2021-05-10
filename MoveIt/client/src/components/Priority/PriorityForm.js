import React, { useState, useContext, useEffect } from "react";
import { Form, Label, Input, Button } from "reactstrap";
import { PriorityContext } from "../../providers/PriorityProvider";
import { useHistory, useParams } from "react-router-dom";

export const PriorityForm = () => {
  const { addPriority, editPriority, getPriority } = useContext(
    PriorityContext
  );

  const history = useHistory();
  const priorityId = parseInt(useParams().id);

  const [priority, setPriority] = useState({
    Id: "",
    Label: "",
  });

  const savePriority = () => {
    if (priorityId) {
      editPriority({
        id: priorityId,
        label: priority.label,
      }).then(() => history.push(`/priority/${priorityId}`));
    } else {
      addPriority({
        label: priority.label,
      }).then(() => {
        history.push("/priority");
      });
    }
  };

  const handleInputChange = (event) => {
    const newPriority = { ...priority };
    let selectedVal = event.target.value;
    if (event.target.id.includes("id")) {
      selectedVal = parseInt(selectedVal);
    }
    newPriority[event.target.id] = selectedVal;
    setPriority(newPriority);
  };

  const handleClickSaveArea = (e) => {
    e.preventDefault();
    if (priority.priorityName === "") {
      window.alert("Please include a priority label");
    } else {
      addPriority(priority).then(() => history.push("/priority"));
    }
  };

  useEffect(() => {
    if (priorityId) {
      getPriority(priorityId).then((priority) => {
        setPriority(priority);
      });
    }
  }, []);

  return (
    <>
      <div>
        <Form className="addPriorityDiv" onSubmit={handleClickSaveArea}>
          <h3 className="priorityForm_title">
            {areaId ? <> Edit Priority Label </> : <> New Priority Label </>}
          </h3>
          <Label for="priorityInput">New Priority Label</Label>
          <Input
            id="label"
            placeholder="Enter Priority Label"
            type="text"
            onChange={handleInputChange}
          ></Input>
          <Button className="a" color="info" onClick={savePriority}>
            {priorityId ? <> Save Changes </> : <> Add New Priority Label </>}
          </Button>
          <Button className="a" href="/priority/">
            Go Back
          </Button>
        </Form>
      </div>
    </>
  );
};
export default PriorityForm;
