import Form from "./components/Form";
import MemoryCard from "./components/MemoryCard";
import AssistiveTechInfo from "./components/AssistiveTechInfo";
import GameOver from "./components/GameOver";
import ErrorCard from "./components/ErrorCard";
import { useMemoryGame } from "./hooks/useMemoryGame";

export default function App() {
  const {
    isFirstRender,
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
  } = useMemoryGame();

  return (
    <main>
      <header>
        <h1>Memory</h1>
        <img src="/brain.svg" alt="Image of a brain." className="icon" />
      </header>

      {!isGameOn && !isError && (
        <Form
          handleSubmit={startGame}
          handleChange={handleFormChange}
          isFirstRender={isFirstRender}
        />
      )}
      {isGameOn && !areAllCardsMatched && (
        <AssistiveTechInfo emojisData={emojisData} matchedCards={matchedCards} />
      )}
      {areAllCardsMatched && <GameOver handleClick={resetGame} />}
      {isGameOn && (
        <MemoryCard
          handleClick={turnCard}
          data={emojisData}
          selectedCards={selectedCards}
          matchedCards={matchedCards}
        />
      )}
      {isError && <ErrorCard handleClick={resetError} />}
    </main>
  );
}
