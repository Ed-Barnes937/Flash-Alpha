import { Button } from '@components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card'
import type { TDeck } from '@types'
import { BlocksIcon, NotebookTextIcon, Rows3Icon } from 'lucide-react'
import { createSearchParams, useNavigate } from 'react-router-dom'

type GameProps = {
  selectedDeck: TDeck['id']
}

const Games = ({ selectedDeck }: GameProps) => {
  const navigate = useNavigate()
  return (
    <Card>
      <CardHeader>
        <CardTitle>Games</CardTitle>
        <CardDescription>Choose how you want to revise</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-12">
          <Button
            className="h-48"
            onClick={() =>
              navigate({ pathname: 'flashcard', search: createSearchParams({ deckId: selectedDeck }).toString() })
            }
          >
            <div>
              <NotebookTextIcon size={'10rem'} />
              Flashcards
            </div>
          </Button>
          <Button
            className="h-48"
            onClick={() =>
              navigate({ pathname: 'rank', search: createSearchParams({ deckId: selectedDeck }).toString() })
            }
          >
            <div>
              <Rows3Icon size={'10rem'} />
              Ranking
            </div>
          </Button>
          <Button
            className="h-48"
            onClick={() =>
              navigate({ pathname: 'match', search: createSearchParams({ deckId: selectedDeck }).toString() })
            }
          >
            <div>
              <BlocksIcon size={'10rem'} />
              Matching
            </div>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default Games
