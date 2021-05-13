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
// Priority Imports
import PriorityList from "./Priority/PriorityList";
import PriorityDetails from "./Priority/PriorityDetails";
import PriorityForm from "./Priority/PriorityDetails";
import PriorityDelete from "./Priority/PriorityDelete";
// Box Imports
import BoxList from "./Box/BoxList";
import BoxForm from "./Box/BoxForm";
import BoxDelete from "./Box/BoxDelete";
// Item Imports
import ItemList from "./Item/ItemList";
import ItemForm from "./Item/ItemForm";
import ItemDelete from "./Item/ItemDelete";

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

        <Route path="/area/delete/:id(\d+)" exact>
          <AreaDelete />
        </Route>

        <Route path="/priority" exact>
          <PriorityList />
        </Route>

        <Route path="/priority/create" exact>
          <PriorityForm />
        </Route>

        <Route path="/priority/edit/:id(\d+)" exact>
          <PriorityForm />
        </Route>

        <Route path="/priority/:id(\d+)" exact>
          <PriorityDetails />
        </Route>

        <Route path="/priority/delete/:id(\d+)" exact>
          <PriorityDelete />
        </Route>

        <Route path="/box/:id" exact>
          <BoxList />
        </Route>

        <Route path="/box/:id/create" exact>
          <BoxForm />
        </Route>

        <Route path="/box/edit/:id(\d+)" exact>
          <BoxForm />
        </Route>

        <Route path="/item/:id" exact>
          <ItemList />
        </Route>

        <Route path="/item/:id/create" exact>
          <ItemForm />
        </Route>

        <Route path="/box/item/:id(\d+)" exact>
          <ItemForm />
        </Route>

        <Route path="/box/delete/:id(\d+)/:moveId(\d+)" exact>
          <BoxDelete />
        </Route>

        <Route path="/item/delete/:id(\d+)/:moveId(\d+)" exact>
          <ItemDelete />
        </Route>
      </Switch>
    </main>
  );
}
