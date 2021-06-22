import { BrowserRouter, Route } from "react-router-dom";
import { createContext, useState, useCallback } from "react";

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { auth, firebase } from "./services/firebase";

import "./services/firebase";

import "./styles/global.scss";

type User = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextData = {
  user: User | undefined;
  signInWithGoogle: () => void;
}

export const AuthContext = createContext({} as AuthContextData);

export default function App() {
  const [ user, setUser ] = useState<User>();

  const signInWithGoogle = useCallback(() => {
    const provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider).then(result => {
      if (result.user) {
        const { displayName, photoURL, uid } = result.user;

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google from account.')
        }
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        })
      }
    });
  }, []);

  return (
   <div>
     <BrowserRouter>
      <AuthContext.Provider value={{ user, signInWithGoogle }}>
        <Route exact path="/" component={Home} />
        <Route path="/rooms/new" component={NewRoom} />
      </AuthContext.Provider>
     </BrowserRouter>
   </div>
  );
}
