import { CheckIcon, XIcon } from 'lucide-react'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import useDeckStore from '../../stores/DeckStore'
import { shuffleArray } from '../../utils/shuffle'

type Mode = 'Question' | 'Answer'

const FlashCardView = () => {
  const [searchParams] = useSearchParams()
  const deckId = searchParams.get('deckId')

  const deck = useDeckStore((store) => store.decks[deckId || ''])
  const cards = deck.cards

  const uuidArr = cards.map((card) => card.id)
  const jumbledArr = shuffleArray(uuidArr)

  const [currentCard, setCurrentCard] = useState(0)
  const [mode, setMode] = useState<Mode>('Question')

  const getText = () => {
    const card = cards.find((card) => card.id === jumbledArr[currentCard])
    if (card) return mode === 'Question' ? card.front : card.back
  }

  const incrementQuestion = () => {
    setCurrentCard((card) => card + 1)
    setMode('Question')
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        {mode === 'Question' && <div>Question: </div>}
        {mode === 'Answer' && <div>Answer: </div>}
        <div className="w-full p-4 outline outline-black">{getText()}</div>
      </div>

      {mode === 'Question' && <Button onClick={() => setMode('Answer')}>Reveal Answer</Button>}
      {mode === 'Answer' && (
        <div className="flex gap-6">
          <Button className="w-full" onClick={incrementQuestion}>
            <CheckIcon />
          </Button>
          <Button className="w-full" onClick={incrementQuestion}>
            <XIcon />
          </Button>
        </div>
      )}
    </div>
  )
}

export default FlashCardView
