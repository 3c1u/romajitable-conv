import { parseAtokRomajiTable } from '~/utils/atokRomajiTable'
import { dialog } from '~/vendor/tauri/dialog'
import { fs } from '~/vendor/tauri/fs'

export const loadRomajiTableFromFile = async () => {
  const res = await dialog?.open({
    title: 'ローマ字テーブルを読み込む...',
    filters: [
      {
        name: 'Mozc/ATOK形式 (*.txt)',
        extensions: ['txt'],
      },
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

  if (!res || res.length === 0) {
    return
  }

  if (typeof res !== 'string' && res.length !== 1) {
    console.error(
      'loadRomajiTableFromFile: dialog.open() returned unexpected value',
      res,
    )
    return
  }

  const path = typeof res === 'string' ? res : res[0]

  try {
    const res = await fs?.readBinaryFile(path)

    if (!res) {
      throw new Error('tauri/fs is not loaded')
    }

    // ATOK形式としてパースしてみる
    try {
      const resAtok = parseAtokRomajiTable(res)
      console.log(
        'loadRomajiTableFromFile: parseAtokRomajiTable() succeeded',
        resAtok,
      )
    } catch (e: unknown) {
      // TODO: support Mozc format
      console.log('failed to parse as ATOK format; falling back to Mozc format', e)
      throw e
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      await dialog?.message('ファイルの読み込みに失敗しました。', {
        title: 'エラー',
        type: 'error',
      })
    } else {
      console.error(
        'loadRomajiTableFromFile: fs?.readBinaryFile() failed with unknown error',
        e,
      )
    }
  }
}
