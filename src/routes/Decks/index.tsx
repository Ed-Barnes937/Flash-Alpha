import { Button } from '@components/ui/button'
import { Card, CardContent } from '@components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@components/ui/table'
import { Tooltip, TooltipProvider, TooltipTrigger } from '@components/ui/tooltip'
import { TooltipContent } from '@radix-ui/react-tooltip'
import clsx from 'clsx'
import { ChevronDownIcon, ChevronLeftIcon, InfoIcon, PlusIcon, TrashIcon } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useDeckStore from '../../stores/DeckStore'

type TableColumns = 'Name' | 'Created at' | 'Last Revised' | 'Confidence' | 'Last Test Score'

const DeckList = () => {
  const navigate = useNavigate()
  const decks = useDeckStore((store) => Object.entries(store.decks))
  const deleteDeck = useDeckStore((store) => store.deleteDeck)

  const [sortOption, setSortOption] = useState<TableColumns>('Created at')
  const [sortDir, setSortDir] = useState(true)

  let sortedArr = decks.sort((a, b) => {
    switch (sortOption) {
      case 'Confidence':
        return (a[1].confidenceScore || 0) - (b[1].confidenceScore || 0)
      case 'Created at':
        return a[1].createdAt.getTime() - b[1].createdAt.getTime()
      case 'Last Revised':
        return (a[1].lastVisited?.getTime() || 0) - (b[1].lastVisited?.getTime() || 0)
      case 'Last Test Score':
        return (a[1].flashcardScore || 0) - (b[1].flashcardScore || 0)
      case 'Name':
        return a[1].name.localeCompare(b[1].name)
    }
  })
  if (sortDir) sortedArr = sortedArr.reverse()

  const toggleSort = (header: TableColumns) => {
    if (sortOption === header) setSortDir((dir) => !dir)
    else {
      setSortOption(header)
      setSortDir(true)
    }
  }

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
                <TableHead onClick={() => toggleSort('Name')} className="w-[100px] cursor-pointer">
                  Name
                  {sortOption === 'Name' && <ChevronDownIcon className={clsx({ 'rotate-180': sortDir })} />}
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => toggleSort('Created at')}>
                  Created At
                  {sortOption === 'Created at' && <ChevronDownIcon className={clsx({ 'rotate-180': sortDir })} />}
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => toggleSort('Last Revised')}>
                  Last Revised
                  {sortOption === 'Last Revised' && <ChevronDownIcon className={clsx({ 'rotate-180': sortDir })} />}
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => toggleSort('Confidence')}>
                  <div className="flex items-center gap-2">
                    Confidence
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <InfoIcon />
                        </TooltipTrigger>
                        <TooltipContent className="bg-black">
                          <p>This is a self reported score at the end of each revision session</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    {sortOption === 'Confidence' && <ChevronDownIcon className={clsx({ 'rotate-180': sortDir })} />}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => toggleSort('Last Test Score')}>
                  Last Test Score
                  {sortOption === 'Last Test Score' && <ChevronDownIcon className={clsx({ 'rotate-180': sortDir })} />}
                </TableHead>
                <TableHead className="cursor-pointer text-right">actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedArr.map(([id, deck]) => (
                <TableRow key={id} onClick={() => navigate(`/deck/${id}`)} className="cursor-pointer">
                  <TableCell className="font-medium">{deck.name}</TableCell>
                  <TableCell>{deck.createdAt.toLocaleString()}</TableCell>
                  <TableCell>{deck.lastVisited?.toLocaleString() || 'Never'}</TableCell>
                  <TableCell>{deck.confidenceScore || 'Not reported'}</TableCell>
                  <TableCell>{deck.flashcardScore || 'Not done'}</TableCell>
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
