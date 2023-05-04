import { RomajiTable } from '~/schema/romajiTable'

export const serializeRomajiTableAsMozcFormat = (romajiTable: RomajiTable) => {
  return (
    romajiTable.entries
      .map(([romaji, kana]) => `${romaji}\t${kana}`)
      .join('\n') + '\n'
  )
}
