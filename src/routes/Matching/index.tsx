import BackButton from '@components/Buttons/BackButton'
import { Button } from '@components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form'
import { Input } from '@components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@components/ui/table'
import { zodResolver } from '@hookform/resolvers/zod'
import useDeckStore from '@stores/DeckStore'
import { cn } from '@utils'
import { shuffleArray } from '@utils/shuffle'
import useSpeech from '@utils/useSpeech'
import { AudioLinesIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { z } from 'zod'

const formSchema = z.object({
  confidence: z.string().min(0).max(100),
})

type MatchingPageProps = {}
const MatchingPage = ({}: MatchingPageProps) => {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const deckId = params.get('deckId')
  const { speak } = useSpeech()

  const setConfidenceScore = useDeckStore((store) => store.setDeckConfidence)
  const setLastVistedDeck = useDeckStore((store) => store.updateLastVisitedDeck)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      confidence: '50',
    },
  })

  const deck = useDeckStore((store) => store.decks[deckId || ''])
  const cards = Object.values(deck?.cards) || []

  const [cardsAndAnswers] = useState(
    shuffleArray(
      cards.flatMap((card) => [
        { id: `q-${card.id}`, cardId: card.id, text: card.front },
        { id: `a-${card.id}`, cardId: card.id, text: card.back },
      ])
    )
  )
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([])

  const [firstSelected, setFirstSelected] = useState<string | null>()
  const [secondSelected, setSecondSelected] = useState<string | null>()

  const handleClick = (id: string) => {
    if (!firstSelected) {
      setFirstSelected(id)
    } else if (!secondSelected) {
      setSecondSelected(id)
    } else {
      // if answer matchs question card
      if (firstSelected.slice(2) === secondSelected.slice(2))
        setCorrectAnswers((ans) => [...ans, firstSelected.slice(2)])
      setFirstSelected(null)
      setSecondSelected(null)
    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    deckId && setConfidenceScore(deckId, Number.parseInt(values.confidence))
    deckId && setLastVistedDeck(deckId)

    navigate(`/`)
  }

  return (
    <>
      <div className="flex items-center border-b">
        <BackButton />
        <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">Card Matching</h1>
      </div>
      {correctAnswers.length !== cards.length && (
        <div className="grid grid-cols-6 gap-1">
          {cardsAndAnswers.map((card) => (
            <div
              key={card.id}
              className={cn([
                'relative flex aspect-square items-center justify-center rounded-lg border bg-card p-2 text-center text-card-foreground shadow-sm',
                'transition-all duration-200 hover:scale-95',
                {
                  'bg-red-300': firstSelected === card.id,
                  'bg-green-300': secondSelected === card.id,
                },
                {
                  'opacity-0': correctAnswers.includes(card.cardId),
                },
              ])}
              onClick={() => handleClick(card.id)}
            >
              <div className="absolute left-1 top-1 uppercase">{card.id.charAt(0)}</div>
              {card.text}
            </div>
          ))}
        </div>
      )}
      {correctAnswers.length === cards.length && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div>🎉 Finished revision of {deck.name} 🎉</div>
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
      )}
      <Card>
        <CardHeader>
          <CardTitle>
            Correct Answers - {correctAnswers.length}/{cards.length}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Side 1</TableHead>
                <TableHead>Side 2</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {correctAnswers.map((id) => (
                <TableRow>
                  <TableCell>
                    {deck.cards[id].front}
                    <Button
                      type="button"
                      variant={'ghost'}
                      size={'icon'}
                      className="justify-self-end"
                      onClick={() => speak(deck.cards[id].front)}
                    >
                      <AudioLinesIcon size={'1rem'} />
                    </Button>
                  </TableCell>
                  <TableCell>
                    {deck.cards[id].back}
                    <Button
                      type="button"
                      variant={'ghost'}
                      size={'icon'}
                      className="justify-self-end"
                      onClick={() => speak(deck.cards[id].back)}
                    >
                      <AudioLinesIcon size={'1rem'} />
                    </Button>{' '}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}

export default MatchingPage
