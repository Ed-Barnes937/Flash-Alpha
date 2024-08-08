import { Button } from '@components/ui/button'
import { Card, CardContent } from '@components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@components/ui/table'
import { ChevronLeftIcon, PlusIcon, TrashIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import useDeckStore from '../../stores/DeckStore'

const DeckList = () => {
  const navigate = useNavigate()
  const decks = useDeckStore((store) => Object.entries(store.decks))
  const deleteDeck = useDeckStore((store) => store.deleteDeck)

  return (
    <>
      <div className="flex justify-between border-b">
        <div className="flex items-center">
          <Button variant={'ghost'} size={'icon'} onClick={() => navigate('/')}>
            <ChevronLeftIcon />
          </Button>
          <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">My Decks</h1>
        </div>
        <Button size={'icon'} aria-label="Create deck" onClick={() => navigate('new')}>
          <PlusIcon />
        </Button>
      </div>
      <Card>
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Last Revised</TableHead>
                <TableHead className="text-right">actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {decks.map(([id, deck]) => (
                <TableRow key={id} onClick={() => navigate(`/deck/${id}`)} className="cursor-pointer">
                  <TableCell className="font-medium">{deck.name}</TableCell>
                  <TableCell>{deck.createdAt.toLocaleDateString()}</TableCell>
                  <TableCell>{deck.lastVisited?.toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      size={'icon'}
                      variant={'destructive'}
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteDeck(id)
                      }}
                    >
                      <TrashIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}

export default DeckList
