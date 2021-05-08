import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
// import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import MoveProvider from "./providers/MoveProvider";
import LocationProvider from "./providers/LocationProvider";
import AreaProvider from "./providers/AreaProvider";

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <LocationProvider>
          <AreaProvider>
            <MoveProvider>
              {/* <Header /> */}
              <ApplicationViews />
            </MoveProvider>
          </AreaProvider>
        </LocationProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;
