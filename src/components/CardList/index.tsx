import useDeckStore from "../../stores/DeckStore";
import type { TDeck } from "../../types";
import Card from "../Card";

type CardListProps = {
  deckId: TDeck["id"];
};
const CardList = ({ deckId }: CardListProps) => {
  const deck = useDeckStore((store) => store.decks[deckId]);

  return (
    <div className="grid grid-cols-2 mx-20">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight w-full text-center">
        Side 1
      </h2>
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight w-full text-center">
        Side 2
      </h2>
      {deck &&
        deck.cards.map((card, index) => (
          <Card key={`card-item-${index}`} {...card} />
        ))}
    </div>
  );
};

export default CardList;
