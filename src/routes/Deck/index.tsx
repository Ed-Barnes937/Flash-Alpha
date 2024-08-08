import BackButton from '@components/Buttons/BackButton'
import CardList from '@components/CardList'
import { Outlet, useParams } from 'react-router-dom'
import useDeckStore from '../../stores/DeckStore'

type DeckListProps = {}
const DeckList = ({}: DeckListProps) => {
  const { deckId } = useParams()
  const deck = useDeckStore((store) => store.decks[deckId || ''])
  const deleteCard = useDeckStore((store) => store.deleteCardFromDeck)

  return (
    <div>
      <div className="flex items-center">
        <BackButton />
        <span className="text-lg font-semibold capitalize">{deck.name}</span>
      </div>
      <CardList cards={deck.cards} deleteCard={deleteCard} />
      <Outlet />
    </div>
  )
}

export default DeckList
