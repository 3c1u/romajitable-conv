import { fs } from '@tauri-apps/api'
import { RomajiTable } from '~/schema/romajiTable'
import { serializeRomajiTableAsMsImeFormat } from '~/utils/msimeRomajiTable/serialize'
import { dialog } from '~/vendor/tauri/dialog'

export const saveRomajiTableAsMsImeFormat = async (
  romajiTable: RomajiTable,
) => {
  if (!dialog || !fs) {
    return
  }

  const res = await dialog.save({
    title: 'ローマ字テーブルを保存...',
    filters: [
      {
        name: 'MS-IME レジストリ形式 (*.reg)',
        extensions: ['reg'],
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
    const data = serializeRomajiTableAsMsImeFormat(romajiTable)

    fs.writeTextFile(res, data)
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
