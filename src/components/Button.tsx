import { useState } from "react"

export function Button() {
  const [counter, setCounter] = useState(0);

  function handleIncrement() {
    setCounter(counter + 1)
  }

  return (
    <button onClick={handleIncrement}>
      {counter}
    </button>
  )
}