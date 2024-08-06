import CardList from "@/components/CardList";
import { Outlet, useParams } from "react-router-dom";

type DeckListProps = {};
const DeckList = ({}: DeckListProps) => {
  const { deckId } = useParams();

  return (
    <div>
      <CardList deckId={deckId || ""} />
      <Outlet />
    </div>
  );
};

export default DeckList;
