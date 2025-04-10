import { useEffect, useRef } from "react";
import RegularButton from "./RegularButton";

interface GameOverProps {
  handleClick: () => void;
}

function GameOver({ handleClick }: GameOverProps) {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.focus();
    }
  }, []);

  return (
    <div className="wrapper wrapper--accent" ref={divRef} tabIndex={-1}>
      <p className="p--large">You've matched all the memory cards!</p>
      <RegularButton onClick={handleClick}>Play again</RegularButton>
    </div>
  );
}

export default GameOver;
