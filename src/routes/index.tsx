import AppLayout from '@/components/Layout'
import { Route, Routes } from 'react-router-dom'
import Deck from './Deck'
import DeckList from './Decks'
import NewDeck from './Decks/New'
import Home from './Home'
import NewCardForm from './NewCardForm'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="decks" element={<DeckList />} />
        <Route path="decks/new" element={<NewDeck />} />
        <Route path="deck/:deckId" element={<Deck />}>
          <Route path="new" element={<NewCardForm />} />
        </Route>
        <Route
          path="flashcard"
          element={
            <div>
              <h1>This is where we'd show flashcards</h1>
            </div>
          }
        />
        <Route
          path="rank"
          element={
            <div>
              <h1>This is where we'd show a ranking page for DnD </h1>
            </div>
          }
        />
        <Route
          path="match"
          element={
            <div>
              <h1>This is where we'd show a matching game</h1>
            </div>
          }
        />
      </Route>
    </Routes>
  )
}

export default AppRoutes
