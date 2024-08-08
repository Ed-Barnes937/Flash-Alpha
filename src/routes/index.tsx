import AppLayout from '@components/Layout'
import { Route, Routes } from 'react-router-dom'
import DeckHome from './DeckDashboard'
import DeckList from './Decks'
import NewDeck from './Decks/New'
import FlashCardView from './Flashcard'
import NewCardForm from './NewCardForm'
import RankingPage from './Ranking'
import { Settings } from './Settings'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<DeckList />} />
        <Route path="deck/new" element={<NewDeck />} />
        <Route path="deck/:deckId" element={<DeckHome />}>
          <Route path="new" element={<NewCardForm />} />
        </Route>
        <Route path="flashcard" element={<FlashCardView />} />
        <Route path="rank" element={<RankingPage />} />
        <Route
          path="match"
          element={
            <div>
              <h1>This is where we'd show a matching game</h1>
            </div>
          }
        />
        <Route path="settings" element={<Settings />}></Route>
      </Route>
    </Routes>
  )
}

export default AppRoutes
