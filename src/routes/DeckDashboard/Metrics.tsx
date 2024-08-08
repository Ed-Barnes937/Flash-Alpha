import useDeckStore from '@/stores/DeckStore'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card'
import { useParams } from 'react-router-dom'

const Metrics = () => {
  const { deckId } = useParams()

  const deck = useDeckStore((store) => store.decks[deckId || ''])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Deck Metrics</CardTitle>
        <CardDescription>Track your learning metrics for this subject</CardDescription>
      </CardHeader>
      <CardContent>
        <div>Time since last visited: {deck.lastVisited?.toLocaleString() || 'never'}</div>
        <div>Self Reported Confidence Score: {deck.confidenceScore || 'never'} %</div>
        <div>Test Score: {deck.flashcardScore || 'never'} %</div>
      </CardContent>
    </Card>
  )
}
export default Metrics
