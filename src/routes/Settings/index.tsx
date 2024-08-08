import BackButton from "@components/Buttons/BackButton"
import { Button } from "@components/ui/button"
import useDeckStore from "@stores/DeckStore"
import { TCard, TDeck } from "@types"
import { generateUUID } from "@utils/generateUUID"

export const Settings = () => {
	const deckStore = useDeckStore()
	const addNewDeck = deckStore.addNewDeck
	return <>
		<BackButton/>
		<Button onClick={() => generateDemoData(addNewDeck)}>Generate Demo Data</Button>
	</>
}

const generateDemoData = (addNewDeck: (deck: TDeck) => void) => {
	for (let i = 0; i < 20; i++) {
		const {createdAt, lastVisited} = randomDates()
		const deckId = generateUUID()
		const newDeck: TDeck = {
			id: deckId,
			name: `DEMO ${i}`,
			cards: randomCards(deckId, createdAt, lastVisited),
			createdAt,
			lastVisited,
			flashcardScore: randomPercentage(),
			confidenceScore: randomPercentage(),
		}
		addNewDeck(newDeck)
	}
}

const randomPercentage = () => {
	return Math.floor(Math.random() * 100)
}

const threeWeeksMillis = 3 * 7 * 24 * 60 * 60 * 1000

const randomDates = () => {
	const createdAt = randomDate(threeWeeksMillis)
	return {
		createdAt,
		lastVisited: randomDate(new Date().getTime() - createdAt.getTime()),
	}
}

const randomDate = (maxMillisAgo: number) => {
	const nowEpoch = new Date().getTime()
	return new Date(Math.floor(nowEpoch - Math.random() * maxMillisAgo))
}

const randomCards = (deckId: string, deckCreatedAt: Date, deckLastVisited: Date): Record<string, TCard> => {
	const count = Math.floor(Math.random() * 20)
	const cards: TCard[] = []
	for (let i = 0; i < count; i++) {
		const createdAt = randomDate(new Date().getTime() - deckCreatedAt.getTime())
		cards.push({
			id: generateUUID(),
			front: `Front-${i}`,
			back: `Back-${i}`,
			deckId,
			createdAt,
			lastVisited: deckLastVisited,
		})
	}

	let result: Record<string, TCard> = {}
	for (let card of cards) {
		result[card.id] = card
	}
	return result
}

