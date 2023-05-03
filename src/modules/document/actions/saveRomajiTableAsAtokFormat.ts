import { fs } from '@tauri-apps/api'
import iconv from 'iconv-lite'
import { RomajiTable } from '~/schema/romajiTable'
import { serializeRomajiTableAsAtokFormat } from '~/utils/atokRomajiTable/serialize'
import { dialog } from '~/vendor/tauri/dialog'

export const saveRomajiTableAsAtokFormat = async (romajiTable: RomajiTable) => {
  if (!dialog || !fs) {
    return
  }

  const res = await dialog.save({
    title: 'ローマ字テーブルを保存...',
    filters: [
      {
        name: 'ATOK形式 (*.txt)',
        extensions: ['txt'],
      },
      {
        name: 'すべてのファイル (*.*)',
        extensions: ['*'],
      },
    ],
  })

  if (res === null) {
    return
  }

  try {
    const data = serializeRomajiTableAsAtokFormat(romajiTable)
    const dataSjis = iconv.encode(data, 'sjis')

    fs.writeBinaryFile(res, Uint8Array.from(dataSjis))
  } catch (e: unknown) {
    if (e instanceof Error) {
      dialog.message('ファイルの保存に失敗しました。', {
        type: 'error',
        title: 'エラー',
      })
    }

    console.error(e)
  }
}
