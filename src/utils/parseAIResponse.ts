import type { TCards } from '@/types'
import { generateUUID } from './generateUUID'

export const parseAIResponse = (input: string): TCards => {
  const newLines = input.split('\n')

  // make sure each sub array has 3 elements (index | question | answer)
  const pipes = newLines.map((newLine) => newLine.split('|')).filter((line) => line.length === 3)

  const returnObj: TCards = {}
  pipes.forEach((card) => {
    const uuid = generateUUID()
    returnObj[uuid] = { id: uuid, front: card[1], back: card[2], createdAt: new Date() }
  })

  console.log(returnObj)
  return returnObj
}
