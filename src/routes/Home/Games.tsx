import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { TDeck } from '@/types'
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
            onClick={() =>
              navigate({ pathname: 'flashcard', search: createSearchParams({ deckId: selectedDeck }).toString() })
            }
          >
            FlashCards
          </Button>
          <Button
            onClick={() =>
              navigate({ pathname: 'rank', search: createSearchParams({ deckId: selectedDeck }).toString() })
            }
          >
            Ranking
          </Button>
          <Button
            onClick={() =>
              navigate({ pathname: 'match', search: createSearchParams({ deckId: selectedDeck }).toString() })
            }
          >
            Matching
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default Games
