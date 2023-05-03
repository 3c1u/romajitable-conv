import { C } from '@tauri-apps/api/event-2a9960e7'
import iconv from 'iconv-lite'
import jaconv from 'jaconv'
import { RomajiTable } from '~/schema/romajiTable'
import { convertCRLF } from '~/utils/convertCRLF'

export const serializeRomajiTableAsAtokFormat = (romajiTable: RomajiTable) => {
  let res = ''
  res += `スタイル=${romajiTable.name}\n`
  res += `スタイルファイル=HKEY_CURRENT_USER\\Software\\Justsystem\\ATOK\\33.0\\Style\\${
    romajiTable.semanticName ?? romajiTable.name
  }\n\n`
  res += 'ローマ字設定=\n'
  res += romajiTable.entries
    .map(([romaji, kana]) => {
      const romajiZen = jaconv.toZen(romaji)
      return `${romajiZen.padEnd(13 - romajiZen.length, ' ')}${kana} `
    })
    .join('\n')

  res += '\n'

  // CRLFに変換
  return convertCRLF(res)
}
