import { AudioLinesIcon } from 'lucide-react'
import type { TCard } from '../../types'
import { Button } from '../ui/button'

type CardProps = {
  front: TCard['front']
  back: TCard['back']
}

const Card = ({ front, back }: CardProps) => {
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
      <div className="flex items-center justify-center border-r-2 border-black p-2">
        {front}
        <Button variant={'ghost'} size={'sm'} className="justify-self-end" onClick={() => speak(front)}>
          <AudioLinesIcon size={'1rem'} />
        </Button>
      </div>
      <div className="flex items-center justify-center p-2">
        {back}
        <Button variant={'ghost'} size={'sm'} className="justify-self-end" onClick={() => speak(back)}>
          <AudioLinesIcon size={'1rem'} />
        </Button>{' '}
      </div>
    </>
  )
}

export default Card
