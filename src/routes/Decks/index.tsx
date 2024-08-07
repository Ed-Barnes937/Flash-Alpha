import BackButton from '@/components/BackButton'
import { Button } from '@/components/ui/button'
import useDeckStore from '@/stores/DeckStore'
import { useNavigate } from 'react-router-dom'

const DeckList = () => {
  const navigate = useNavigate()
  const decks = useDeckStore((store) => Object.entries(store.decks))

  return (
    <>
      <div className="flex justify-between border-b">
        <div className="flex items-center">
          <BackButton />
          <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">My Decks</h1>
        </div>
        <Button aria-label="Create deck" onClick={() => navigate('new')}>
          +
        </Button>
      </div>
      <ul className="flex flex-col gap-2">
        {decks.map(([id, deck]) => (
          <li onClick={() => navigate(`/deck/${id}`)} key={id}>
            <Button>{deck.name}</Button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default DeckList
