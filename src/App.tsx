import { BrowserRouter, Route, Switch } from "react-router-dom";

import { AuthContextProvider } from "./contexts/AuthContext";
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { Room } from "./pages/Room";

import "./services/firebase";

import "./styles/global.scss";

export default function App() {
  return (
   <div>
     <BrowserRouter>
        <AuthContextProvider>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/rooms/new" component={NewRoom} />
            <Route path="/rooms/:id" component={Room} />
          </Switch>  
        </AuthContextProvider>
     </BrowserRouter>
   </div>
  );
}
