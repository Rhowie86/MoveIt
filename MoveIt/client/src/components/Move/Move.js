import React from "react";
import { Card, CardImg, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";

export const Move = ({ move }) => {
  const user = JSON.parse(sessionStorage.getItem("userProfile"));

  const renderMove = user !== null && user.id === move.userProfile.id;

  const moveHtml = () => {
    return (
      <Card className="m-4">
        <p className="text-left px-2">{move.userProfile.displayName}'s Move'</p>
        <CardBody>
          <p>
            <Link to={`/move/${move.id}`}>
              <strong>{move.name}</strong>
            </Link>
          </p>
        </CardBody>
      </Card>
    );
  };

  //   const incorrectUser = () => {
  //     return (
  //       <Card className="m-4">
  //         <CardBody>
  //           <p>
  //             <strong>IncorrectUser</strong>
  //           </p>
  //         </CardBody>
  //       </Card>
  //     );
  //   };

  return <div>{renderMove ? moveHtml() : null}</div>;
};

export default Move;
