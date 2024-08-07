import { Button } from '@/components/ui/button'
import useDeckStore from '@/stores/DeckStore'
import { useState } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import Header from './Header'

const Home = () => {
  const navigate = useNavigate()
  const decks = useDeckStore((store) => store.decks)

  const deckList = Object.values(decks)
  const [selectedDeck, setDeck] = useState(deckList[0].id)

  return (
    <div className="flex flex-col gap-2">
      <Header selectedDeck={selectedDeck} setSelected={setDeck} />
      <div className="grid grid-cols-3 gap-12">
        <Button
          onClick={() =>
            navigate({ pathname: 'flashcard', search: createSearchParams({ deckId: selectedDeck }).toString() })
          }
        >
          FlashCards
        </Button>
        <Button
          onClick={() =>
            navigate({ pathname: 'rank', search: createSearchParams({ deckId: selectedDeck }).toString() })
          }
        >
          Ranking
        </Button>
        <Button
          onClick={() =>
            navigate({ pathname: 'match', search: createSearchParams({ deckId: selectedDeck }).toString() })
          }
        >
          Matching
        </Button>
      </div>
    </div>
  )
}

export default Home
