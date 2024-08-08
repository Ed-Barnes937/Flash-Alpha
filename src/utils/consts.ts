import type { TDecks } from '@types'

export const AI_PROMPT = `I want you to create a deck of flashcards from the text.

Instructions to create a deck of flashcards:
- Keep the flashcards simple, clear, and focused on the most important information.
- Make sure the questions are specific and unambiguous.
- Use simple and direct language to make the cards easy to read and understand.
- Answers should contain only a single key fact/name/concept/term.

Flashcard format:
Number|Question|Answer

Text: `

export const DEMO_DATA: TDecks = {
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
  '2': {
    id: '2',
    name: 'Battle of Hastings',
    cards: {
      'ec2c2454-ad2c-43d4-aeea-e503a7a2869a': {
        id: 'ec2c2454-ad2c-43d4-aeea-e503a7a2869a',
        front: 'What event triggered the succession struggle for the English throne in 1066?',
        back: 'The death of King Edward the Confessor.',
        createdAt: new Date('2024-08-08T13:05:58.761Z'),
      },
      '021bf0a5-6b5e-4660-bae5-faa1abde56e9': {
        id: '021bf0a5-6b5e-4660-bae5-faa1abde56e9',
        front: "Who was crowned king shortly after Edward's death?",
        back: 'Harold.',
        createdAt: new Date('2024-08-08T13:05:58.761Z'),
      },
      '2fff0868-2c9a-4d00-be17-7b8644501152': {
        id: '2fff0868-2c9a-4d00-be17-7b8644501152',
        front: "Which three claimants invaded Harold's England?",
        back: 'William, Tostig, and Harald Hardrada.',
        createdAt: new Date('2024-08-08T13:05:58.761Z'),
      },
      '2740158b-ab0f-49fa-b20a-163f5f695bbc': {
        id: '2740158b-ab0f-49fa-b20a-163f5f695bbc',
        front: 'What battle did Hardrada and Tostig win against the English army?',
        back: 'The Battle of Fulford.',
        createdAt: new Date('2024-08-08T13:05:58.761Z'),
      },
      '40c8249a-447c-41cd-a5d7-f7058385cb7e': {
        id: '40c8249a-447c-41cd-a5d7-f7058385cb7e',
        front: 'What battle resulted in the defeat of Hardrada and Tostig?',
        back: 'The Battle of Stamford Bridge.',
        createdAt: new Date('2024-08-08T13:05:58.761Z'),
      },
      '7be38570-0279-4b52-9646-551aba34c2e7': {
        id: '7be38570-0279-4b52-9646-551aba34c2e7',
        front: "Who was Harold's only serious opponent after Stamford Bridge?",
        back: 'William.',
        createdAt: new Date('2024-08-08T13:05:58.761Z'),
      },
      '178b4784-b98a-4f63-8830-12ed3bd0e395': {
        id: '178b4784-b98a-4f63-8830-12ed3bd0e395',
        front: 'Where did William land his invasion forces?',
        back: 'Pevensey.',
        createdAt: new Date('2024-08-08T13:05:58.761Z'),
      },
      'd9f5a617-777c-46d6-9931-07111ef582e5': {
        id: 'd9f5a617-777c-46d6-9931-07111ef582e5',
        front: 'What date did William land at Pevensey?',
        back: '28 September 1066.',
        createdAt: new Date('2024-08-08T13:05:58.761Z'),
      },
      '979b006e-be3d-4541-9e4d-358b452d5a9e': {
        id: '979b006e-be3d-4541-9e4d-358b452d5a9e',
        front: 'How was the English army primarily composed?',
        back: 'Almost entirely of infantry.',
        createdAt: new Date('2024-08-08T13:05:58.761Z'),
      },
      '366770b3-73a8-423b-a057-a345c66563ab': {
        id: '366770b3-73a8-423b-a057-a345c66563ab',
        front: 'What tactic did the Normans use during the battle?',
        back: 'Pretending to flee in panic.',
        createdAt: new Date('2024-08-08T13:05:58.761Z'),
      },
      'fea6fdd7-5677-4764-8d7b-ef029d7f4364': {
        id: 'fea6fdd7-5677-4764-8d7b-ef029d7f4364',
        front: "What was the outcome of Harold's death in the battle?",
        back: 'Retreat and defeat of most of his army.',
        createdAt: new Date('2024-08-08T13:05:58.761Z'),
      },
      '4bf4ec3e-8e68-4e56-b03f-1e541b9d8d06': {
        id: '4bf4ec3e-8e68-4e56-b03f-1e541b9d8d06',
        front: 'When was William crowned king of England?',
        back: 'Christmas Day 1066.',
        createdAt: new Date('2024-08-08T13:05:58.761Z'),
      },
    },
    createdAt: new Date(),
    lastVisited: new Date(),
  },
}

export const AI_HINT_PROMPT = `I want you to split the provided text sections, with each section summarising one main point.

Instructions to create good sections:
- Keep the sections simple, clear, and focused on the most important information.
- Make sure the sections are specific and unambiguous.
- Use simple and direct language to make the sections easy to read and understand.

Format: Put each section on a separate line.

Text: `
