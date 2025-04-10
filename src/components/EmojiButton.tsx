import { decodeEntity } from "html-entities";
import { ICard, IEmoji } from "../models/IEmoji";

interface EmojiButtonProps {
  emoji: IEmoji;
  index: number;
  handleClick: () => void;
  selectedCardEntry?: ICard;
  matchedCardEntry?: ICard;
}

export default function EmojiButton({
  emoji,
  index,
  handleClick,
  selectedCardEntry,
  matchedCardEntry,
}: EmojiButtonProps) {
  const btnAria = matchedCardEntry
    ? `${decodeEntity(emoji.name)}. Matched`
    : selectedCardEntry
    ? `${decodeEntity(emoji.name)}. Not matched yet.`
    : "Card upside down.";

  const btnContent =
    matchedCardEntry || selectedCardEntry ? decodeEntity(emoji.htmlCode[0]) : "?";

  const btnStyle = matchedCardEntry
    ? "btn--emoji__back--matched"
    : selectedCardEntry
    ? "btn--emoji__back--selected"
    : "btn--emoji__front";

  return (
    <button
      className={`btn btn--emoji ${btnStyle}`}
      onClick={selectedCardEntry ? undefined : handleClick}
      disabled={!!matchedCardEntry}
      aria-label={`Position ${index + 1}: ${btnAria}`}
      aria-live="polite"
    >
      {btnContent}
    </button>
  );
}
