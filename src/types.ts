export type TCard = {
  id: string
  front: string
  back: string
  deckId?: TDeck['id']
  createdAt: Date
  lastVisited?: Date
}
export type TCards = Record<TCard['id'], TCard>

export type TDeck = {
  cards: Record<TCard['id'], TCard>
  name: string
  id: string
  createdAt: Date
  lastVisited?: Date
  // test score
  flashcardScore?: number
  // self reported
  confidenceScore?: number
}

export type TDecks = Record<string, TDeck>
