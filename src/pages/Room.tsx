import { useParams } from "react-router-dom";
import { FormEvent, useState, useEffect } from "react";

import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import { database } from "../services/firebase";
import { useAuth } from "../hooks/useAuth";

import logoImg from "../assets/logo.svg";

import "../styles/room.scss";

type FirebaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  },
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
}>

type RoomParams = {
  id: string;
}

type Question = {
  id: string;
  content: {
    author: {
      name: string;
      avatar: string;
    },
  },
  author: {
    name: string;
    avatar: string;
  },
  isAnswered: boolean;
  isHighlighted: boolean;
}

export function Room() {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const [ newQuestion, setNewQuestion ] = useState('');
  const [ questions, setQuestions ] = useState<Question[]>([]);
  const [ title, setTitle ] = useState();

  const roomId = params.id;

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on('value', room => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value,
          author: value.author,
          isAnswered: value.isAnswered,
          isHighlighted: value.isHighlighted
        }
      });
      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    })
  }, [roomId]);

  async function handleCreateNewQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === '') {
      return;
    }
    if (!user) {
      alert("You must be logged in");
    }

    const question = {
      content: newQuestion,
      author: {
        name: user?.name,
        avatar: user?.avatar
      },
      isHighlighted: false,
      isAnswered: false
    };

    await database.ref(`rooms/${roomId}/questions`).push(question);

    setNewQuestion('');
  }

  return (
    <div id="page-room">
      <header>
        <div className="content-header">
          <img src={logoImg} alt="Letmeask" />
          <RoomCode code={roomId} />
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <form onSubmit={handleCreateNewQuestion}>
          <textarea
            placeholder="O que você quer perguntar?"
            onChange={event => setNewQuestion(event.target.value)}
            value={newQuestion}
          />

        <div className="form-footer">
          {user ? (
            <div className="user-info">
              <img src={user.avatar} alt="Nome do usuário" />
              <span>{user.name}</span>
            </div>
          ) : (
            <span>Para enviar uma pergunta, <button className="button-login">faça seu login</button>.</span>
          )}
          <Button type="submit" disabled={!user}>
            Enviar pergunta
          </Button>
        </div>
        </form>
        {JSON.stringify(questions)}
      </main>
    </div>
  )
}