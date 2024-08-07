import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import useDeckStore from '@/stores/DeckStore'
import type { TDeck } from '@/types'
import { LayersIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

type HeaderProps = {
  selectedDeck: TDeck['id']
  setSelected: (deck: TDeck['id']) => void
}

const Header = ({ selectedDeck, setSelected }: HeaderProps) => {
  const decks = useDeckStore((store) => store.decks)
  const navigate = useNavigate()

  return (
    <div className="flex items-center justify-between border-b pb-1">
      <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">Dashboard</h1>
      <div className="flex gap-2">
        <Select defaultValue={selectedDeck} onValueChange={(id) => setSelected(id)}>
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
  )
}

export default Header
