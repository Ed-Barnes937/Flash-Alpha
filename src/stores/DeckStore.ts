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
  // updateLastVisitedDeck
  // updateLastVisitedCard: (deckId: TDeck['id'], cardId: TCard['id']) => void
}

type DeckStore = DeckState & DeckActions

const DEMO_DATA: TDecks = {
  '1': {
    id: '1',
    name: 'first',
    cards: {
      '1': { id: '1', front: 'My Front', back: 'My Back', deckId: '1', createdAt: new Date() },
      '2': { id: '2', front: 'My Other Front', back: 'My Other Back', deckId: '1', createdAt: new Date() },
      '3': { id: '3', front: 'His Front', back: 'His Back', deckId: '1', createdAt: new Date() },
      '4': { id: '4', front: 'Her Front', back: 'Her Back', deckId: '1', createdAt: new Date() },
    },
    createdAt: new Date(),
  },
}

const useDeckStore = create<DeckStore>()(
  immer((set) => ({
    decks: DEMO_DATA,
    addCardToDeck: (deckId, newCard) =>
      set((state) => {
        state.decks[deckId].cards[newCard.id] = newCard
      }),
    addNewDeck: (newDeck) =>
      set((state) => {
        const parsedNewDeck = { ...newDeck }
        for (let key in parsedNewDeck.cards) {
          parsedNewDeck.cards[key] = { ...parsedNewDeck.cards[key], deckId: parsedNewDeck.id }
        }
        state.decks[newDeck.id] = parsedNewDeck
      }),
    deleteCardFromDeck: (deckId, cardId) =>
      set((state) => {
        delete state.decks[deckId].cards[cardId]
      }),
    // updateLastVisitedCard: (deckId, cardId) => {
    //   set(state => {
    //     state.decks[deckId].cards.
    //   })
    // },
  }))
)

export default useDeckStore
