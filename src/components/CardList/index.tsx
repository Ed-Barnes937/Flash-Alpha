import type { TCard } from '../../types'
import Card from '../Card'

type CardListProps = {
  cards: TCard[]
}
const CardList = ({ cards = [] }: CardListProps) => {
  return (
    <div className="mx-20 grid grid-cols-2">
      <h2 className="w-full scroll-m-20 text-center text-2xl font-semibold tracking-tight">Side 1</h2>
      <h2 className="w-full scroll-m-20 text-center text-2xl font-semibold tracking-tight">Side 2</h2>
      {cards.map((card, index) => (
        <Card key={`card-item-${index}`} {...card} />
      ))}
    </div>
  )
}

export default CardList
