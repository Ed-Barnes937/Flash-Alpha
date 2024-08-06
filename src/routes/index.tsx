import AppLayout from "@/components/Layout";
import { Route, Routes } from "react-router-dom";
import Deck from "./Deck";
import Home from "./Home";
import NewCardForm from "./NewCardForm";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="deck/:deckId" element={<Deck />}>
          <Route path="new" element={<NewCardForm />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
