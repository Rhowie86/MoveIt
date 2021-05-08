import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// User Imports
import { UserProfileContext } from "../providers/UserProfileProvider";
// Move Imports
import { MoveList } from "./Move/MoveList";
import { MoveDetails } from "./Move/MoveDetails";
import { MoveForm } from "./Move/MoveForm";
import { MoveDelete } from "./Move/MoveDelete";
// Location Imports

import LocationList from "./Location/LocationList";
// Area Imports
import AreaList from "./Area/AreaList";
import AreaDetails from "./Area/AreaDetails";
import AreaForm from "./Area/AreaForm";
import AreaDelete from "./Area/AreaDelete";

import Login from "./Login/Login";
import Register from "./Login/Register";
import Home from "./Home/Home.js";

export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserProfileContext);

  return (
    <main>
      <Switch>
        <Route path="/location" exact>
          <LocationList />
        </Route>

        <Route exact path="/">
          {isLoggedIn ? <Home /> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        <Route path="/move" exact>
          <MoveList />
        </Route>

        <Route path="/move/create" exact>
          <MoveForm />
        </Route>

        <Route path="/move/edit/:id(\d+)" exact>
          {isLoggedIn ? <MoveForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/move/:id(\d+)" exact>
          {isLoggedIn ? <MoveDetails /> : <Redirect to="/login" />}
        </Route>

        <Route path="/move/delete/:id(\d+)" exact>
          <MoveDelete />
        </Route>

        <Route path="/area" exact>
          <AreaList />
        </Route>

        <Route path="/area/create" exact>
          <AreaForm />
        </Route>

        <Route path="/area/edit/:id(\d+)" exact>
          <AreaForm />
        </Route>

        <Route path="/area/:id(\d+)" exact>
          <AreaDetails />
        </Route>

        <Route path="area/delete/:id(\d+)" exact>
          <AreaDelete />
        </Route>
      </Switch>
    </main>
  );
}
