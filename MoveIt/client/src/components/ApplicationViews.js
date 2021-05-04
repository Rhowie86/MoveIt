import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import MoveProvider from "../providers/MoveProvider";
import {
  UserProfileContext,
  UserProfileProvider,
} from "../providers/UserProfileProvider";
import { MoveList } from "./Move/MoveList";

import Login from "./Login/Login";
import Register from "./Login/Register";

export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserProfileContext);

  return (
    <main>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        <MoveProvider>
          <Route path="/move">
            <MoveList />
          </Route>
        </MoveProvider>
      </Switch>
    </main>
  );
}
