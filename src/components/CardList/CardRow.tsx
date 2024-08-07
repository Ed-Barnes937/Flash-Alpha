import { AudioLinesIcon, TrashIcon } from 'lucide-react'
import type { CardListProps } from '../../components/CardList'
import type { TCard } from '../../types'
import { Button } from '../ui/button'
import { TableCell, TableRow } from '../ui/table'

type CardRowProps = TCard & Pick<CardListProps, 'deleteCard'>

const CardRow = ({ front, back, id, deckId, deleteCard }: CardRowProps) => {
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      speechSynthesis.speak(utterance)
    } else {
      alert('Sorry, your browser does not support text-to-speech.')
    }
  }

  return (
    <TableRow>
      <TableCell>
        {front}
        <Button type="button" variant={'ghost'} size={'icon'} className="justify-self-end" onClick={() => speak(front)}>
          <AudioLinesIcon size={'1rem'} />
        </Button>
      </TableCell>
      <TableCell>
        {back}
        <Button type="button" variant={'ghost'} size={'icon'} className="justify-self-end" onClick={() => speak(back)}>
          <AudioLinesIcon size={'1rem'} />
        </Button>{' '}
      </TableCell>
      <TableCell className="text-right">
        <Button size={'icon'} type="button" onClick={() => deleteCard(deckId || '', id)}>
          <TrashIcon />
        </Button>
      </TableCell>
    </TableRow>
  )
}

export default CardRow
