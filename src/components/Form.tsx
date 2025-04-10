import { ChangeEvent, FormEvent, useEffect, useRef } from "react";
import RegularButton from "./RegularButton";
import Select from "./Select";

interface FormProps {
  handleSubmit: (e: FormEvent) => void;
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  isFirstRender: boolean;
}

export default function Form({
  handleSubmit,
  handleChange,
  isFirstRender,
}: FormProps) {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isFirstRender && divRef.current) {
      divRef.current.focus();
    }
  }, [isFirstRender]);

  return (
    <div className="form--container">
      <p className="p--regular">
        Customize the game by selecting an emoji category and a number of memory
        cards.
      </p>
      <form className="wrapper" onSubmit={handleSubmit}>
        <Select handleChange={handleChange} />
        <RegularButton>Start Game</RegularButton>
      </form>
    </div>
  );
}
