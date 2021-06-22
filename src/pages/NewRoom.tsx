import { FiLogIn } from "react-icons/fi";

import { Button } from "../components/Button";

import illustration from "../assets/illustration.svg";
import logoImg from "../assets/logo.svg";

import "../styles/new-room.scss";

export function NewRoom() {
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

          <form>
            <input
              type="text"
              placeholder="Nome da sala"
            />
            <Button type="submit">
              <FiLogIn />
              Entra na sala
            </Button>

            <p>
              Quer entrar em uma sala já existente? <a href="#">Clique aqui</a>
            </p>
          </form>
        </div>
      </main>
    </div>
  )
}