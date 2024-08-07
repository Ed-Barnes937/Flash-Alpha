import type { TCards } from '../../types'
import { Card, CardContent } from '../ui/card'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '../ui/table'
import CardRow from './CardRow'

export type CardListProps = {
  cards: TCards
  deleteCard: (deckId: string, cardId: string) => void
}
const CardList = ({ cards = {}, deleteCard }: CardListProps) => {
  return (
    <Card>
      <CardContent className="p-6">
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
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default CardList
