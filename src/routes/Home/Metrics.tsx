import useDeckStore from '@/stores/DeckStore'
import type { TDeck } from '@/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card'

type MetricsProps = {
  selectedDeck: TDeck['id']
}

const Metrics = ({ selectedDeck }: MetricsProps) => {
  const deck = useDeckStore((store) => store.decks[selectedDeck])
  const timeSinceLastVisited = deck.lastVisited && new Date().getTime() - deck.lastVisited.getTime()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Deck Metrics</CardTitle>
        <CardDescription>Track your learning metrics for this subject</CardDescription>
      </CardHeader>
      <CardContent>
        <div>Time since last visited: {timeSinceLastVisited || 'never'}</div>
        <div>Confidence Score: '60%'</div>
      </CardContent>
    </Card>
  )
}
export default Metrics
