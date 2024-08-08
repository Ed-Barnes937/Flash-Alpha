import { Button } from '@components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form'
import { Input } from '@components/ui/input'
import { Separator } from '@components/ui/separator'
import { zodResolver } from '@hookform/resolvers/zod'
import useDeckStore from '@stores/DeckStore'
import type { TCard } from '@types'
import { produce } from 'immer'
import { useCallback, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { z } from 'zod'
import RankedCard from './RankedCard'

const formSchema = z.object({
  confidence: z.string().min(0).max(100),
})

const RankingPage = () => {
  const [params] = useSearchParams()
  const deckId = params.get('deckId')
  const navigate = useNavigate()

  const setConfidenceScore = useDeckStore((store) => store.setDeckConfidence)

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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      confidence: '50',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    deckId && setConfidenceScore(deckId, Number.parseInt(values.confidence))

    navigate(`/`)
  }

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
        <CardFooter className="flex-col items-start gap-4">
          <Separator />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="confidence"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How confident do you feel about this topic now?</FormLabel>
                    <FormControl>
                      <Input type="number" min={0} max={100} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardFooter>
      </Card>
    </DndProvider>
  )
}

export default RankingPage
