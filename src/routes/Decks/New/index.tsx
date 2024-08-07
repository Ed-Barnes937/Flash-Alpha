import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import useDeckStore from '@/stores/DeckStore'
import { zodResolver } from '@hookform/resolvers/zod'
import type { TCard } from '@types'
import { generateUUID } from '@utils/generateUUID'
import { parseAIResponse } from '@utils/parseAIResponse'
import { LoaderIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { AI_PROMPT } from '../../../utils/consts'

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name text must be at least 2 characters.' }),
  bulkText: z.string(),
})

// TODO - tweak this, we probably don't want the sections in the response (maybe save somewhere for later though), and we need to give it a format
const generatePrompt = (input: string) => {
  return `${AI_PROMPT} ${input}`
}

const NewDeck = () => {
  const navigate = useNavigate()
  const addNewDeck = useDeckStore((store) => store.addNewDeck)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>()
  const [cards, setCards] = useState<TCard[]>([])

  const fetchData = async (input: string) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_OPENAPI_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'user',
              content: generatePrompt(input),
            },
          ],
          temperature: 0.7,
        }),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      console.log(data)
      setCards(parseAIResponse(data.choices[0].message.content))
    } catch (err) {
      // narrow error to string or error
      if (typeof err === 'string') {
        setError(err)
      } else if (err instanceof Error) {
        setError(err.message)
      }
    } finally {
      setLoading(false)
    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    addNewDeck({
      name: values.name,
      id: generateUUID(),
      cards,
    })

    navigate(`/decks`)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Name" {...field} />
              </FormControl>
              <FormDescription>What is the name of this Deck?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bulkText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>AI input</FormLabel>
              <FormControl>
                <Textarea placeholder="Text you want to use to generate your cards" {...field} />
              </FormControl>
              <FormDescription>Click auto-generate to make minimal cards</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="button" onClick={() => fetchData(form.getValues().bulkText)}>
          {loading ? <LoaderIcon className="animate-spin" /> : 'Auto Generate Cards'}
        </Button>

        {error && <p className="text-red-500">{error}</p>}

        <div>
          <Button type="button">Manually add card</Button>
        </div>

        <div>
          <p>Cards go here</p>
          <ol>
            {cards.map((card) => (
              <li key={card.id}>{card.front}</li>
            ))}
          </ol>
        </div>

        <div className="flex gap-2">
          <Button type="submit">Submit</Button>
          <Button type="button" onClick={() => navigate(`/decks`)}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default NewDeck
