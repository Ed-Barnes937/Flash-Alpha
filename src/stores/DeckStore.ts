import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type { TCard, TDeck, TDecks } from '../types'

type DeckState = {
  decks: TDecks
}

type DeckActions = {
  addCardToDeck: (deckId: TDeck['id'], newCard: TCard) => void
  addNewDeck: (newDeck: TDeck) => void
  deleteCardFromDeck: (deckId: TDeck['id'], cardId: TCard['id']) => void
}

type DeckStore = DeckState & DeckActions

const DEMO_DATA: TDecks = {
  '1': {
    id: '1',
    name: 'first',
    cards: [
      { id: '1', front: 'My Front', back: 'My Back', deckId: '1' },
      { id: '2', front: 'My Other Front', back: 'My Other Back', deckId: '1' },
      { id: '3', front: 'His Front', back: 'His Back', deckId: '1' },
      { id: '4', front: 'Her Front', back: 'Her Back', deckId: '1' },
    ],
  },
  '2': {
    id: '2',
    name: 'second',
    cards: [
      { id: '1', front: 'My Front', back: 'My Back', deckId: '2' },
      { id: '2', front: 'My Other Front', back: 'My Other Back', deckId: '2' },
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
    deleteCardFromDeck: (deckId, cardId) =>
      set((state) => {
        state.decks[deckId].cards = state.decks[deckId].cards.filter(({ id }) => id !== cardId)
      }),
  }))
)

export default useDeckStore
