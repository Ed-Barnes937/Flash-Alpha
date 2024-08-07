import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import useDeckStore from '@/stores/DeckStore'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip'
import { LayersIcon } from 'lucide-react'
import { useState } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const decks = useDeckStore((store) => store.decks)

  const deckList = Object.values(decks)
  const [selectedDeck, setDeck] = useState(deckList[0].id)

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Dashboard</h1>
        <div className="flex gap-2">
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
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant={'ghost'} size={'sm'} onClick={() => navigate('decks')}>
                  <LayersIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Deck Library</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
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
