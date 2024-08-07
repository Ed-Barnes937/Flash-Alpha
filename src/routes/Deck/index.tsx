import BackButton from '@/components/BackButton'
import CardList from '@/components/CardList'
import useDeckStore from '@/stores/DeckStore'
import { Outlet, useParams } from 'react-router-dom'

type DeckListProps = {}
const DeckList = ({}: DeckListProps) => {
  const { deckId } = useParams()
  const deck = useDeckStore((store) => store.decks[deckId || ''])

  return (
    <div>
      <div className="flex items-center">
        <BackButton />
        <span className="text-lg font-semibold capitalize">{deck.name}</span>
      </div>
      <CardList cards={deck.cards} />
      <Outlet />
    </div>
  )
}

export default DeckList
