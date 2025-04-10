import { IEmoji, ICard } from "../models/IEmoji";
import EmojiButton from "./EmojiButton";

interface MemoryCardProps {
  selectedCards: ICard[];
  matchedCards: ICard[];
  handleClick: (index: number, name: string) => void;
  data: IEmoji[];
}

export default function MemoryCard({
  handleClick,
  data,
  selectedCards,
  matchedCards,
}: MemoryCardProps) {
  const cardEl = data.map((emoji, index) => {
    const selectedCardEntry = selectedCards.find((emoji) => emoji.index === index);
    const matchedCardEntry = matchedCards.find((emoji) => emoji.index === index);

    let cardStyle: string;

    if (matchedCardEntry) {
      cardStyle = "card-item--matched";
    } else if (selectedCardEntry) {
      cardStyle = "card-item--selected";
    } else {
      cardStyle = "";
    }

    return (
      <li key={index} className={`${cardStyle} card-item`}>
        <EmojiButton
          emoji={emoji}
          index={index}
          handleClick={() => handleClick(index, emoji.name)}
          selectedCardEntry={selectedCardEntry}
          matchedCardEntry={matchedCardEntry}
        />
      </li>
    );
  });

  return <ul className="card-container">{cardEl}</ul>;
}
