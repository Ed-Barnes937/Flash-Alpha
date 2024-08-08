export const filterObjectByIds = <T extends Record<string, {}>>(givenObj: T, ids: string[]) => {
  const copy = { ...givenObj }

  ids.forEach((id) => delete copy[id])

  return copy
}
