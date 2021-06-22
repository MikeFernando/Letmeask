import { BrowserRouter, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";

import "./services/firebase";

import "./styles/global.scss";

export default function App() {
  return (
   <div>
     <BrowserRouter>
      <Route exact path="/" component={Home} />
      <Route path="/rooms/new" component={NewRoom} />
     </BrowserRouter>
   </div>
  );
}
