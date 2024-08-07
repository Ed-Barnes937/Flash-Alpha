import type { TCard } from '@types'
import { generateUUID } from './generateUUID'

export const parseAIResponse = (input: string): TCard[] => {
  console.log({ input })
  const newLines = input.split('\n')

  // make sure each sub array has 3 elements (index | question | answer)
  const pipes = newLines.map((newLine) => newLine.split('|')).filter((line) => line.length === 3)

  console.log(pipes)
  return pipes.map((card) => ({ id: generateUUID(), front: card[1], back: card[2] }))
}
