export const parseAIHintsResponse = (input: string): string[] => {
  return input.split('\n').filter((line) => line.length > 0)
}
