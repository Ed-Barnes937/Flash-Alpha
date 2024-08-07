import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import useDeckStore from '@/stores/DeckStore'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const decks = useDeckStore((store) => store.decks)

  const deckList = Object.values(decks)
  const [selectedDeck, setDeck] = useState(deckList[0].id)

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Dashboard</h1>
        <Select defaultValue={selectedDeck} onValueChange={(id) => setDeck(id)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Deck" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(decks).map((deck) => (
              <SelectItem key={deck.id} value={deck.id}>
                {deck.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-3 gap-12">
        <Button onClick={() => navigate('decks')}>Manage Decks</Button>
        <Button onClick={() => navigate('flashcard')}>FlashCards</Button>
        <Button onClick={() => navigate('rank')}>Ranking</Button>
        <Button onClick={() => navigate('match')}>Matching</Button>
      </div>
    </div>
  )
}

export default Home
