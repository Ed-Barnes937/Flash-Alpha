import type { TCard } from '../../types'
import Card from '../Card'

export type CardListProps = {
  cards: TCard[]
  deleteCard: (deckId: string, cardId: string) => void
}
const CardList = ({ cards = [], deleteCard }: CardListProps) => {
  return (
    <div className="mx-20 grid grid-cols-3 items-center">
      <h2 className="w-full scroll-m-20 text-center text-2xl font-semibold tracking-tight">Side 1</h2>
      <h2 className="w-full scroll-m-20 text-center text-2xl font-semibold tracking-tight">Side 2</h2>
      <span>Actions</span>
      {cards.map((card, index) => (
        <Card key={`card-item-${index}`} {...card} deleteCard={deleteCard} />
      ))}
    </div>
  )
}

export default CardList
