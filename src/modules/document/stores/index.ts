import { atom } from 'jotai'
import { RomajiTable } from '~/schema/romajiTable'

interface AppDocument {
  name: string
  isDirty: boolean
  data: RomajiTable
}

export const documentAtom = atom<AppDocument | null>(null)

export const documentIsDirtyAtom = atom(
  get => get(documentAtom)?.isDirty ?? false,
  (get, set, isDirty: boolean) => {
    const document = get(documentAtom)
    if (document) {
      set(documentAtom, { ...document, isDirty })
    }
  },
)
