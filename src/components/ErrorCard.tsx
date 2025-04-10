import { useEffect, useRef } from "react";
import RegularButton from "./RegularButton";

interface ErrorCardProps {
  handleClick: () => void;
}

export default function ErrorCard({ handleClick }: ErrorCardProps) {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.focus();
    }
  }, []);

  return (
    <div className="wrapper wrapper--accent" ref={divRef} tabIndex={-1}>
      <p className="p--large">Sorry, there was an error.</p>
      <p className="p--regular">
        Please come back later or click the button below to try restarting the game.
      </p>
      <RegularButton onClick={handleClick}>Restart game</RegularButton>
    </div>
  );
}
