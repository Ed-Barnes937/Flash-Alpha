import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-2">
      <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Dashboard
      </h1>
      <Button onClick={() => navigate("decks")}>Show Decks</Button>
      <div className="grid grid-cols-3 gap-12">
        <Button onClick={() => navigate("flashcard")}>FlashCards</Button>
        <Button onClick={() => navigate("rank")}>Ranking</Button>
        <Button onClick={() => navigate("match")}>Matching</Button>
      </div>
    </div>
  );
};

export default Home;
