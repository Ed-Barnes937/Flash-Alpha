import BackButton from '@components/Buttons/BackButton'
import CardList from '@components/CardList'
import { Button } from '@components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form'
import { Input } from '@components/ui/input'
import { Textarea } from '@components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import useDeckStore from '@stores/DeckStore'
import type { TCards } from '@types'
import { AI_HINT_PROMPT, AI_PROMPT } from '@utils/consts'
import { generateUUID } from '@utils/generateUUID'
import { parseAIHintsResponse } from '@utils/parseAIHintsResponse'
import { parseAIResponse } from '@utils/parseAIResponse'
import { LoaderIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name text must be at least 2 characters.' }),
  bulkText: z.string().optional(),
  newQuestion: z.string(),
  newAnswer: z.string(),
})

const generatePrompt = (input: string) => {
  return `${AI_PROMPT} ${input}`
}

const generateHintPrompt = (input: string) => {
	return `${AI_HINT_PROMPT} ${input}}`
}

const NewDeck = () => {
  const navigate = useNavigate()
  const addNewDeck = useDeckStore((store) => store.addNewDeck)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      bulkText: '',
      newQuestion: '',
      newAnswer: '',
    },
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>()
  const [cards, setCards] = useState<TCards>({})
  const [hints, setHints] = useState<string[]>([])
  const [hintIndex, setHintIndex] = useState<number>(0)

  const fetchData = async (input: string) => {
    setLoading(true)
    setError(null)

    if (!input) return

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

  const fetchHints = async (input: string) => {
    // setLoading(true)
    // setError(null)

    if (!input) return

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
              content: generateHintPrompt(input),
            },
          ],
          temperature: 0.7,
        }),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()

      setHints(parseAIHintsResponse(data.choices[0].message.content))
    } catch (err) {
      // // narrow error to string or error
      // if (typeof err === 'string') {
      //   setError(err)
      // } else if (err instanceof Error) {
      //   setError(err.message)
      // }
	  // TODO - hint error handling
    } finally {
      // setLoading(false)
	  // TODO - hint loading handling
    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    addNewDeck({
      name: values.name,
      id: generateUUID(),
      cards,
      createdAt: new Date(),
    })

    navigate(`/decks`)
  }

  const deleteCard = (_: string, cardId: string) => {
    setCards((cards) => {
      const result = { ...cards }
      delete result[cardId]
      return result
    })
  }

  return (
    <>
      <div className="flex">
        <BackButton />
        <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">Create a new deck</h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardContent className="p-6">
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

              <div className="my-4 flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="bulkText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>AI input</FormLabel>
                      <FormControl>
                        <Textarea placeholder="" {...field} />
                      </FormControl>
                      <FormDescription>Click auto-generate to scaffold cards from text</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="button" onClick={() => fetchData(form.getValues().bulkText || '')}>
                  {loading ? <LoaderIcon className="animate-spin" /> : 'Auto Generate Cards'}
                </Button>
                {error && <p className="text-red-500">{error}</p>}
				<Button type="button" onClick={() => fetchHints(form.getValues().bulkText || '')}>
				  Generate hints
				</Button>
              </div>

		      {hints.length !== 0 && 
					<>
						<p>{hints[hintIndex]}</p>
						<Button type="button" onClick={() => setHintIndex(Math.max(0, hintIndex - 1))}>Previous Hint</Button>
						<Button type="button" onClick={() => setHintIndex(Math.min(hints.length-1, hintIndex + 1))}>Next Hint</Button>
					</>
				}

              <div className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="newQuestion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Question</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="newAnswer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Answer</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  onClick={() =>
                    setCards((cards) => {
                      const result = { ...cards }
                      const uuid = generateUUID()
                      result[uuid] = {
                        id: uuid,
                        front: form.getValues().newQuestion,
                        back: form.getValues().newAnswer,
                        createdAt: new Date(),
                      }
                      return result
                    })
                  }
                >
                  Manually add card
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Card Deck</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <CardList cards={cards} deleteCard={deleteCard} />
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2">
            <Button type="submit">Save</Button>
            <Button type="button" onClick={() => navigate(`/decks`)} variant={'destructive'}>
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}

export default NewDeck
