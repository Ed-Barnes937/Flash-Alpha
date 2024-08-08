import { Button } from '@components/ui/button'
import { Card, CardContent, CardHeader } from '@components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form'
import { Input } from '@components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import useDeckStore from '@stores/DeckStore'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { z } from 'zod'

const formSchema = z.object({
  confidence: z.string().min(0).max(100),
})

type FinishedCardProps = {
  result: number
}

const FinishedCard = ({ result }: FinishedCardProps) => {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const deckId = params.get('deckId')

  const deck = useDeckStore((store) => store.decks[deckId || ''])
  const setConfidenceScore = useDeckStore((store) => store.setDeckConfidence)
  const setFlashcardScore = useDeckStore((store) => store.setDeckFlashcardScore)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      confidence: '50',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    deckId && setConfidenceScore(deckId, Number.parseInt(values.confidence))
    deckId && setFlashcardScore(deckId, result)

    navigate(`/`)
  }

  return (
    <Card>
      <CardHeader>🎉 Finished revision of {deck.name} 🎉</CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  )
}

export default FinishedCard
