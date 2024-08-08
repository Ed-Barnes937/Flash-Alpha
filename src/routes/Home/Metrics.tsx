import useDeckStore from '@/stores/DeckStore'
import type { TDeck } from '@/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card'

type MetricsProps = {
  selectedDeck: TDeck['id']
}

const Metrics = ({ selectedDeck }: MetricsProps) => {
  const deck = useDeckStore((store) => store.decks[selectedDeck])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Deck Metrics</CardTitle>
        <CardDescription>Track your learning metrics for this subject</CardDescription>
      </CardHeader>
      <CardContent>
        <div>Time since last visited: {deck.lastVisited?.toLocaleString() || 'never'}</div>
        <div>Self Reported Confidence Score: {deck.confidenceScore || 'never'}</div>
        <div>Test Score: {deck.flashcardScore || 'never'}</div>
      </CardContent>
    </Card>
  )
}
export default Metrics
