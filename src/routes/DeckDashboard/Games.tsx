import { Button } from '@components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card'
import { BlocksIcon, NotebookTextIcon, Rows3Icon } from 'lucide-react'
import { createSearchParams, useNavigate, useParams } from 'react-router-dom'

const Games = () => {
  const navigate = useNavigate()
  const { deckId } = useParams()

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
            onClick={() => {
              if (deckId) {
                navigate({ pathname: '/flashcard', search: createSearchParams({ deckId }).toString() })
              }
            }}
          >
            <div>
              <NotebookTextIcon size={'10rem'} />
              Flashcards
            </div>
          </Button>
          <Button
            className="h-48"
            onClick={() => {
              if (deckId) {
                navigate({ pathname: '/rank', search: createSearchParams({ deckId }).toString() })
              }
            }}
          >
            <div>
              <Rows3Icon size={'10rem'} />
              Ranking
            </div>
          </Button>
          <Button
            className="h-48"
            onClick={() => {
              if (deckId) {
                navigate({ pathname: '/match', search: createSearchParams({ deckId }).toString() })
              }
            }}
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
