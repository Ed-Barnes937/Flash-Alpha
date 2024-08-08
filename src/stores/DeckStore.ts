import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type { TCard, TDeck, TDecks } from '../types'

type DeckState = {
  decks: TDecks
}

type DeckActions = {
  addCardToDeck: (deckId: TDeck['id'], newCard: TCard) => void
  addNewDeck: (newDeck: TDeck) => void
  deleteDeck: (deckId: TDeck['id']) => void
  deleteCardFromDeck: (deckId: TDeck['id'], cardId: TCard['id']) => void
  updateLastVisitedDeck: (deckId: TDeck['id']) => void
  updateLastVisitedCard: (deckId: TDeck['id'], cardId: TCard['id']) => void
  setDeckConfidence: (deckId: TDeck['id'], confidence: number) => void
  setDeckFlashcardScore: (deckId: TDeck['id'], score: number) => void
}

type DeckStore = DeckState & DeckActions

const DEMO_DATA: TDecks = {
  '1': {
    id: '1',
    name: 'Maths',
    cards: {
      '1': { id: '1', front: '2 + 2 =', back: '4', deckId: '1', createdAt: new Date() },
      '2': { id: '2', front: '3 x 4', back: '12', deckId: '1', createdAt: new Date() },
      '3': { id: '3', front: '5^2', back: '25', deckId: '1', createdAt: new Date() },
      '4': { id: '4', front: 'sqrt(36)', back: '6', deckId: '1', createdAt: new Date() },
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
    deleteDeck: (deckId) =>
      set((state) => {
        delete state.decks[deckId]
      }),
    deleteCardFromDeck: (deckId, cardId) =>
      set((state) => {
        delete state.decks[deckId].cards[cardId]
      }),
    updateLastVisitedDeck: (deckId) => {
      set((state) => {
        state.decks[deckId].lastVisited = new Date()
      })
    },
    updateLastVisitedCard: (deckId, cardId) => {
      set((state) => {
        state.decks[deckId].cards[cardId].lastVisited = new Date()
      })
    },
    setDeckConfidence: (deckId, confidence) => {
      if (deckId)
        set((state) => {
          state.decks[deckId].confidenceScore = confidence
        })
    },
    setDeckFlashcardScore: (deckId, score) => {
      if (deckId)
        set((state) => {
          state.decks[deckId].flashcardScore = score
        })
    },
  }))
)

export default useDeckStore
