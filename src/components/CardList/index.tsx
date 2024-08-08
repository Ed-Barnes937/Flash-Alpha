import type { TCards } from '../../types'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import CardRow from './CardRow'

export type CardListProps = {
  cards: TCards
  deleteCard: (deckId: string, cardId: string) => void
}
const CardList = ({ cards = {}, deleteCard }: CardListProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Side 1</TableHead>
          <TableHead>Side 2</TableHead>
          <TableHead className="text-right">actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.values(cards).map((card, index) => (
          <CardRow key={`card-item-${index}`} {...card} deleteCard={deleteCard} />
        ))}
        {Object.values(cards).length === 0 && (
          <TableRow>
            <TableCell colSpan={3}>No Cards in this deck</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default CardList
