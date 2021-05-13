import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import Header from "./components/Header.js";
import ApplicationViews from "./components/ApplicationViews";
import MoveProvider from "./providers/MoveProvider";
import LocationProvider from "./providers/LocationProvider";
import AreaProvider from "./providers/AreaProvider";
import BoxProvider from "./providers/BoxProvider";
import ItemProvider from "./providers/ItemProvider";
import PriorityProvider from "./providers/PriorityProvider";

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <LocationProvider>
          <AreaProvider>
            <PriorityProvider>
              <BoxProvider>
                <MoveProvider>
                  <ItemProvider>
                    <Header />
                    <ApplicationViews />
                  </ItemProvider>
                </MoveProvider>
              </BoxProvider>
            </PriorityProvider>
          </AreaProvider>
        </LocationProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;
