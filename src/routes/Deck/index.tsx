import CardList from '@components/CardList'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card'
import { useParams } from 'react-router-dom'
import useDeckStore from '../../stores/DeckStore'

type DeckProps = {}
const Deck = ({}: DeckProps) => {
  const { deckId } = useParams()
  const deck = useDeckStore((store) => store.decks[deckId || ''])
  const deleteCard = useDeckStore((store) => store.deleteCardFromDeck)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Deck</CardTitle>
        <CardDescription>A list of the cards in this deck</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <CardList cards={deck.cards} deleteCard={deleteCard} />
      </CardContent>
    </Card>
  )
}

export default Deck
