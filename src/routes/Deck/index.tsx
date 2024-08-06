import CardList from "@/components/CardList";
import { Button } from "@components/button";
import { Outlet, useNavigate, useParams } from "react-router-dom";

type DeckListProps = {};
const DeckList = ({}: DeckListProps) => {
  const navigate = useNavigate();

  const { deckId } = useParams();

  return (
    <div>
      <div className="flex justify-between">
        <Button onClick={() => navigate("/")}>Home</Button>
        <Button onClick={() => navigate(`new`)}>Create</Button>
      </div>
      <CardList deckId={deckId || ""} />
      <Outlet />
    </div>
  );
};

export default DeckList;
