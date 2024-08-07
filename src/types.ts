export type TCard = {
  id: string
  front: string
  back: string
  deckId: TDeck['id']
}

export type TDeck = {
  cards: TCard[]
  name: string
  id: string
}

export type TDecks = Record<string, TDeck>
