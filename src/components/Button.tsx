import { ButtonHTMLAttributes, ReactNode } from "react";

import "../styles/button.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({children}: ButtonProps) {
  return (
    <button className="enter-room">
      {children}
    </button>
  )
}