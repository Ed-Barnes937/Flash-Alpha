import { Button } from '@components/ui/button'
import { Card, CardContent, CardHeader } from '@components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form'
import { Input } from '@components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { z } from 'zod'

const formSchema = z.object({
  confidence: z.number().min(0).max(100),
})

type FinishedCardProps = {}

const FinishedCard = ({}: FinishedCardProps) => {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const deckId = params.get('deckId')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      confidence: 50,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(deckId, values)

    navigate(`/`)
  }

  return (
    <Card>
      <CardHeader>🎉 Finished revision of 'insert deck name here' 🎉</CardHeader>
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
