import iconv from 'iconv-lite'
import { RomajiTable } from '~/schema/romajiTable'

const convertCRLF = (str: string) => str.replaceAll('\n', '\r\n')

export const serializeRomajiTableAsMsImeFormat = (romajiTable: RomajiTable) => {
  let res = 'Windows Registry Editor Version 5.00\n\n'

  res += `[HKEY_CURRENT_USER\\Software\\Microsoft\\IME\\15.0\\IMEJP\\RomaDef\\${romajiTable.name}]\n`
  res += '"table"=hex:\\\n'

  for (const [romaji, kana] of romajiTable.entries) {
    const buf = iconv.encode(`${romaji}=${kana}\0`, 'sjis')

    const hex = Array.from(buf)
      .map(b => b.toString(16).padStart(2, '0').toUpperCase())
      .join(',')

    res += `${hex},\\\n`
  }

  res += '00'

  // CRLFに変換
  return convertCRLF(res)
}
