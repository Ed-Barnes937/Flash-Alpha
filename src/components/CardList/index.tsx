import useDeckStore from "../../stores/DeckStore";
import type { TDeck } from "../../types";
import Card from "../Card";

type CardListProps = {
  deckId: TDeck["id"];
};
const CardList = ({ deckId }: CardListProps) => {
  const deck = useDeckStore((store) => store.decks[deckId]);

  return (
    <div>
      {deck &&
        deck.cards.map((card, index) => (
          <Card key={`card-item-${index}`} {...card} />
        ))}
    </div>
  );
};

export default CardList;
