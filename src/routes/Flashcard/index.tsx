import BackButton from '@components/Buttons/BackButton'
import { Button } from '@components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@components/ui/card'
import { shuffleArray } from '@utils/shuffle'
import { CheckIcon, XIcon } from 'lucide-react'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import useDeckStore from '../../stores/DeckStore'
import FinishedCard from './FinishedCard'

type Mode = 'Question' | 'Answer' | 'Finished'

const FlashCardView = () => {
  const [searchParams] = useSearchParams()
  const deckId = searchParams.get('deckId')

  const deck = useDeckStore((store) => store.decks[deckId || ''])
  const updateLastVisitedDeck = useDeckStore((store) => store.updateLastVisitedDeck)
  const updateLastVisitedCard = useDeckStore((store) => store.updateLastVisitedCard)
  const cards = deck.cards

  const uuidArr = Object.values(cards).map((card) => card.id)
  const jumbledArr = shuffleArray(uuidArr)

  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [mode, setMode] = useState<Mode>('Question')
  const [correctCount, setCorrectCount] = useState(0)

  const getText = () => {
    const card = cards[jumbledArr[currentCardIndex]]
    if (card) {
      switch (mode) {
        case 'Question':
          return card.front
        case 'Answer':
          return card.back
        default:
          return ''
      }
    }
  }

  const AnswerQuestion = (correct: boolean) => {
    const nextCardCount = currentCardIndex + 1

    console.log(jumbledArr[currentCardIndex], correct)
    if (nextCardCount >= Object.values(cards).length) {
      setMode('Finished')
      deckId && updateLastVisitedDeck(deckId)
    } else {
      if (correct) setCorrectCount((count) => count + 1)
      deckId && updateLastVisitedCard(deckId, jumbledArr[currentCardIndex])
      setCurrentCardIndex(nextCardCount)
      setMode('Question')
    }
  }

  const getResultScore = () => {
    return Math.floor((correctCount / jumbledArr.length) * 100)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center border-b">
        <BackButton />
        <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">Flashcard Revision</h1>
      </div>
      {mode === 'Finished' && <FinishedCard result={getResultScore()} />}
      {mode !== 'Finished' && (
        <Card>
          <CardHeader>
            <CardTitle>
              {mode === 'Question' && `Question ${currentCardIndex + 1}:`}
              {mode === 'Answer' && `Answer`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full rounded-sm border p-4">
              <div className="text-center text-lg font-semibold">{getText()}</div>
            </div>
          </CardContent>
          <CardFooter className="gap-4">
            {mode === 'Question' && <Button onClick={() => setMode('Answer')}>Reveal Answer</Button>}
            {mode === 'Answer' && (
              <>
                <Button className="w-full" onClick={() => AnswerQuestion(true)}>
                  <CheckIcon />
                </Button>
                <Button className="w-full" onClick={() => AnswerQuestion(false)} variant={'destructive'}>
                  <XIcon />
                </Button>
              </>
            )}
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

export default FlashCardView
