import { Button } from '@components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@components/ui/card'
import useDeckStore from '@stores/DeckStore'
import type { TCard } from '@types'
import { produce } from 'immer'
import { useCallback, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useNavigate, useSearchParams } from 'react-router-dom'
import RankedCard from './RankedCard'

const RankingPage = () => {
  const [params] = useSearchParams()
  const deckId = params.get('deckId')
  const navigate = useNavigate()

  const [cards, setCards] = useState<TCard[]>(
    Object.values(useDeckStore((store) => store.decks[deckId || ''].cards) || {})
  )

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setCards(
      produce((prevCards) => {
        const prevCard = prevCards[dragIndex]
        prevCards.splice(dragIndex, 1)
        prevCards.splice(hoverIndex, 0, prevCard)
      })
    )
  }, [])

  return (
    <DndProvider backend={HTML5Backend}>
      <Card>
        <CardHeader>
          <CardTitle>Card Rankings</CardTitle>
          <CardDescription>Order these cards based on their relevance to the topic</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {cards.map((card, i) => (
              <RankedCard key={card.id} front={card.front} cardId={card.id} index={i} moveCard={moveCard} />
            ))}
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button onClick={() => navigate(-1)}>Save</Button>
        </CardFooter>
      </Card>
    </DndProvider>
  )
}

export default RankingPage
