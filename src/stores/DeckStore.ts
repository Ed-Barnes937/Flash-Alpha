import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type { TCard, TDeck, TDecks } from '../types'

type DeckState = {
  decks: TDecks
}

type DeckActions = {
  addCardToDeck: (deckId: TDeck['id'], newCard: TCard) => void
  addNewDeck: (newDeck: TDeck) => void
}

type DeckStore = DeckState & DeckActions

const DEMO_DATA: TDecks = {
  '1': {
    id: '1',
    name: 'first',
    cards: [
      { id: '1', front: 'My Front', back: 'My Back' },
      { id: '2', front: 'My Other Front', back: 'My Other Back' },
      { id: '3', front: 'His Front', back: 'His Back' },
      { id: '4', front: 'Her Front', back: 'Her Back' },
    ],
  },
  '2': {
    id: '2',
    name: 'second',
    cards: [
      { id: '1', front: 'My Front', back: 'My Back' },
      { id: '2', front: 'My Other Front', back: 'My Other Back' },
    ],
  },
}

const useDeckStore = create<DeckStore>()(
  immer((set) => ({
    decks: DEMO_DATA,
    addCardToDeck: (deckId, newCard) =>
      set((state) => {
        state.decks[deckId].cards.push(newCard)
      }),
    addNewDeck: (newDeck) =>
      set((state) => {
        state.decks[newDeck.id] = newDeck
      }),
  }))
)

export default useDeckStore
