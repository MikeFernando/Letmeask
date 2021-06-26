import { useCallback, useState, FormEvent } from "react";
import { FiLogIn } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";

import { database } from "../services/firebase";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/Button";

import illustration from "../assets/illustration.svg";
import logoImg from "../assets/logo.svg";

import "../styles/new-room.scss";

export function NewRoom() {
  const history = useHistory();
  const { user } = useAuth();
  const [ newRoom, setNewRoom ] = useState('');

  const handleCreateRoom = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    history.push(`/rooms/${firebaseRoom.key}`);
  }, [ newRoom, history, user?.id ]);

  return (
    <div id="page-new-room">
      <aside>
        <img src={illustration} alt="ilustração simbolizando perguntas e respostas" />
        <strong>Toda pergunta tem uma resposta.</strong>
        <p>
          Aprenda e compartilhe conhecimento com outras pessoas
        </p>
      </aside>

      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />

          <h2>Crie uma nova sala</h2>
          
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">
              <FiLogIn />
              Entra na sala
            </Button>

            <p>
              Quer entrar em uma sala já existente? 
              <Link to="/">
                <a href="/">Clique aqui</a>
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  )
}