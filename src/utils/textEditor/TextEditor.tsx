// https://github.com/adazzle/react-data-grid/blob/main/src/editors/textEditor.tsx
import { EditorProps } from 'react-data-grid'

function autoFocusAndSelect(input: HTMLInputElement | null) {
  input?.focus()
  input?.select()
}

export const TextEditor = <TRow, TSummaryRow>({
  row,
  column,
  onRowChange,
  onClose,
}: EditorProps<TRow, TSummaryRow>) => {
  return (
    <input
      className='w-full px-2'
      ref={autoFocusAndSelect}
      value={row[column.key as keyof TRow] as unknown as string}
      onChange={event =>
        onRowChange({ ...row, [column.key]: event.target.value })
      }
      onBlur={() => onClose(true)}
    />
  )
}
