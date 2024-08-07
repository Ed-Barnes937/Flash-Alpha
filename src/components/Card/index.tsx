import { AudioLinesIcon, TrashIcon } from 'lucide-react'
import type { CardListProps } from '../../components/CardList'
import type { TCard } from '../../types'
import { Button } from '../ui/button'

type CardProps = TCard & Pick<CardListProps, 'deleteCard'>

const Card = ({ front, back, id, deckId, deleteCard }: CardProps) => {
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      speechSynthesis.speak(utterance)
    } else {
      alert('Sorry, your browser does not support text-to-speech.')
    }
  }

  return (
    <>
      <div className="flex items-center justify-between border-b border-r border-black p-2">
        {front}
        <Button type="button" variant={'ghost'} size={'sm'} className="justify-self-end" onClick={() => speak(front)}>
          <AudioLinesIcon size={'1rem'} />
        </Button>
      </div>
      <div className="flex items-center justify-between border-b border-black p-2">
        {back}
        <Button type="button" variant={'ghost'} size={'sm'} className="justify-self-end" onClick={() => speak(back)}>
          <AudioLinesIcon size={'1rem'} />
        </Button>{' '}
      </div>
      <Button type="button" onClick={() => deleteCard(deckId, id)}>
        <TrashIcon />
      </Button>
    </>
  )
}

export default Card
