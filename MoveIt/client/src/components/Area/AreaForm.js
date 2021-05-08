import React, { useState, useContext, useEffect } from "react";
import { Form, Label, Input, Button } from "reactstrap";
import { AreaContext } from "../../providers/AreaProvider";
import { useHistory, useParams } from "react-router-dom";

export const AreaForm = () => {
  const { addArea, editArea, getArea } = useContext(AreaContext);

  const history = useHistory();
  const areaId = parseInt(useParams().id);

  const [area, setArea] = useState({
    Id: "",
    AreaName: "",
  });

  const userId = JSON.parse(sessionStorage.getItem("userProfile"));

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
