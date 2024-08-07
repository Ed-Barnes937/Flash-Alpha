import useDeckStore from '@/stores/DeckStore'
import { useState } from 'react'
import Games from './Games'
import Header from './Header'
import Metrics from './Metrics'

const Home = () => {
  const decks = useDeckStore((store) => store.decks)

  const deckList = Object.values(decks)
  const [selectedDeck, setDeck] = useState(deckList[0].id)

  return (
    <div className="flex flex-col gap-2">
      <Header selectedDeck={selectedDeck} setSelected={setDeck} />
      <div className="flex flex-col gap-4">
        <Metrics selectedDeck={selectedDeck} />
        <Games selectedDeck={selectedDeck} />
      </div>
    </div>
  )
}

export default Home
