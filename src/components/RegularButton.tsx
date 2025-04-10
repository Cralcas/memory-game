import { ReactNode, ButtonHTMLAttributes } from "react";

interface RegularButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function RegularButton({
  children,
  onClick,
  ...props
}: RegularButtonProps) {
  return (
    <button className="btn btn--text" onClick={onClick} {...props}>
      {children}
    </button>
  );
}
