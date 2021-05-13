import React from "react";
import { Button, Card, CardBody } from "reactstrap";
import { useHistory } from "react-router-dom";

export const Home = () => {
  const history = useHistory();
  const user = JSON.parse(sessionStorage.getItem("userProfile"));

  return (
    <>
      <Card>
        <h3 className="ml-4">Welcome {user.displayName}!</h3>
        <CardBody>
          <div>
            <Button
              className="home-btn-reg"
              color="secondary"
              onClick={() => {
                history.push("/move");
              }}
            >
              My Move's
            </Button>
          </div>
          <div>
            <Button
              className="home-btn-reg"
              color="secondary"
              onClick={() => {
                history.push("/move/create");
              }}
            >
              New Move
            </Button>
          </div>
        </CardBody>
      </Card>
    </>
  );
};
export default Home;
