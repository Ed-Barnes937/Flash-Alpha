import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import useDeckStore from "../../stores/DeckStore";

const Home = () => {
  const navigate = useNavigate();
  const decks = useDeckStore((store) => Object.entries(store.decks));

  return (
    <div className="flex flex-col gap-2">
      <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        My Decks
      </h1>
      <ul>
        {decks.map(([id, deck]) => (
          <li onClick={() => navigate(`/deck/${id}`)} key={id}>
            <Button>{deck.name}</Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
