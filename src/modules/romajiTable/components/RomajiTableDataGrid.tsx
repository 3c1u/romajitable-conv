import { useAtomValue } from 'jotai'
import { Text, tokens } from '@fluentui/react-components'
import DataGrid from 'react-data-grid'
import { documentAtom } from '~/modules/document/stores'

import 'react-data-grid/lib/styles.css'

const columns = [
  { key: 'romaji', name: 'ローマ字' },
  { key: 'kana', name: 'かな' },
]

export const RomajiTableDataGrid = () => {
  const document = useAtomValue(documentAtom)

  const rows =
    document?.data?.entries.map(([romaji, kana]) => ({
      romaji,
      kana,
    })) ?? []

  if (rows.length === 0) {
    return (
      <div className="p-6 py-10 w-full flex flex-col">
        <Text
          as="p"
          align="center"
          style={{
            color: tokens.colorNeutralForeground3,
          }}
        >
          ローマ字テーブルは空です。
        </Text>
      </div>
    )
  }

  return <DataGrid className="h-full w-full" columns={columns} rows={rows} />
}
