import { useHistory } from "react-router-dom";
import { useCallback } from "react";
import { FiLogIn } from "react-icons/fi";

import { Button } from "../components/Button";

import illustration from "../assets/illustration.svg";
import logoImg from "../assets/logo.svg";
import googleIconImage from "../assets/google-icon.svg";

import "../styles/auth.scss";
import { useAuth } from "../hooks/useAuth";

export function Home() {
  const { user, signInWithGoogle } = useAuth();
  const history = useHistory();

  const handleCreateRoom = useCallback(async() => {
    if (!user) {
      await signInWithGoogle();
    }

    history.push('/rooms/new');
  }, []);

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
          <form>
            <input
              type="text"
              placeholder="Digite o código da sala"
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