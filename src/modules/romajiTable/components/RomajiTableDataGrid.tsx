import 'react-data-grid/lib/styles.css'
import DataGrid from 'react-data-grid'
import { TextEditor } from '~/utils/textEditor/TextEditor'

const columns = [
  { key: 'romaji', name: 'ローマ字', editor: TextEditor },
  { key: 'kana', name: 'かな', editor: TextEditor },
]

const rows = [
  { romaji: 'a', kana: 'あ' },
  { romaji: 'i', kana: 'い' },
  { romaji: 'u', kana: 'う' },
  { romaji: 'e', kana: 'え' },
  { romaji: 'o', kana: 'お' },
]

export const RomajiTableDataGrid = () => {
  return <DataGrid className="h-full w-full" columns={columns} rows={rows} />
}
