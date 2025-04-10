import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { fetchEmojis } from "../services/emojiService";
import { IEmoji, ICard } from "../models/IEmoji";

export function useMemoryGame() {
  const initialFormData = {
    category: "animals-and-nature",
    number: 10,
  };

  const [isFirstRender, setIsFirstRender] = useState(true);
  const [formData, setFormData] = useState(initialFormData);
  const [isGameOn, setIsGameOn] = useState(false);
  const [areAllCardsMatched, setAreAllCardsMatched] = useState(false);
  const [emojisData, setEmojisData] = useState<IEmoji[]>([]);
  const [selectedCards, setSelectedCards] = useState<ICard[]>([]);
  const [matchedCards, setMatchedCards] = useState<ICard[]>([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (
      selectedCards.length === 2 &&
      selectedCards[0].name === selectedCards[1].name
    ) {
      setMatchedCards((prevMatchedCards) => [...prevMatchedCards, ...selectedCards]);
    }
  }, [selectedCards]);

  useEffect(() => {
    if (emojisData.length > 0 && matchedCards.length === emojisData.length) {
      setAreAllCardsMatched(true);
    }
  }, [emojisData.length, matchedCards.length]);

  function handleFormChange(e: ChangeEvent<HTMLSelectElement>) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  }

  async function startGame(e: FormEvent) {
    e.preventDefault();

    const data = await fetchEmojis(formData.category);

    if (data.length > 0) {
      const dataSlice = getDataSlice(data);
      const emojisArray = getEmojisArray(dataSlice);

      setEmojisData(emojisArray);
      setIsGameOn(true);
    } else {
      setIsError(true);
    }
    setIsFirstRender(false);
  }

  function getDataSlice(data: IEmoji[]) {
    const randomIndices = getRandomIndices(data);
    const dataSlice = randomIndices.map((index) => data[index]);
    return dataSlice;
  }

  function getRandomIndices(data: IEmoji[]) {
    const randomIndicesArray: number[] = [];

    for (let i = 0; i < formData.number / 2; i++) {
      const randomNumber = Math.floor(Math.random() * data.length);

      if (!randomIndicesArray.includes(randomNumber)) {
        randomIndicesArray.push(randomNumber);
      } else {
        i--;
      }
    }

    return randomIndicesArray;
  }

  function getEmojisArray(data: IEmoji[]) {
    const pairedEmojisArray = [...data, ...data];

    for (let i = pairedEmojisArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const k = pairedEmojisArray[i];
      pairedEmojisArray[i] = pairedEmojisArray[j];
      pairedEmojisArray[j] = k;
    }

    return pairedEmojisArray;
  }

  function turnCard(index: number, name: string) {
    if (selectedCards.length < 2) {
      setSelectedCards((prevSelectedCards) => [
        ...prevSelectedCards,
        { index, name },
      ]);
    } else if (selectedCards.length === 2) {
      setSelectedCards([{ name, index }]);
    }
  }

  function resetGame() {
    setIsGameOn(false);
    setAreAllCardsMatched(false);
    setSelectedCards([]);
    setMatchedCards([]);
  }

  function resetError() {
    setIsError(false);
  }

  return {
    isFirstRender,
    formData,
    isGameOn,
    areAllCardsMatched,
    emojisData,
    selectedCards,
    matchedCards,
    isError,
    handleFormChange,
    startGame,
    turnCard,
    resetGame,
    resetError,
  };
}
