import { useAtom } from 'jotai'
import { documentIsDirtyAtom } from '~/modules/document/stores'

export const useDocumentIsDirty = () => {
  const [isDirty, setIsDirty] = useAtom(documentIsDirtyAtom)

  return {
    isDirty,
    setIsDirty,
  }
}
