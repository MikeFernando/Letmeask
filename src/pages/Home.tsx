import { useHistory } from "react-router-dom";
import { useCallback, FormEvent, useState } from "react";
import { FiLogIn } from "react-icons/fi";

import { database } from "../services/firebase";

import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";

import illustration from "../assets/illustration.svg";
import logoImg from "../assets/logo.svg";
import googleIconImage from "../assets/google-icon.svg";

import "../styles/auth.scss";

export function Home() {
  const { user, signInWithGoogle } = useAuth();
  const history = useHistory();
  const [ roomCode, setRoomCode ] = useState('');

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }
    history.push('/rooms/new');
  }

  const handleJoinRoom = useCallback(async (event: FormEvent) => {
    event.preventDefault()

    if(roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`/rooms/${roomCode}`).get();

    if(!roomRef.exists()) {
      alert('Room does not exists.')
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }, [ roomCode ]);


  return (
    <div id="page-auth">
      <aside>
        <img src={illustration} alt="ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>

      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <button
            className="create-room"
            onClick={handleCreateRoom}
          >
            <img src={googleIconImage} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">
              <FiLogIn />
              Entra na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}