import iconv from 'iconv-lite'
import jaconv from 'jaconv'
import { Buffer } from 'buffer'
import { RomajiTable } from '~/schema/romajiTable'

export const parseAtokRomajiTable = (raw: Uint8Array): RomajiTable => {
  if (!iconv.encodingExists('sjis')) {
    throw new Error('Shift_JIS decoder is not properly loaded')
  }

  // Shift-JISとしてパースする
  const data = iconv.decode(Buffer.from(raw), 'sjis')
  if (!data.startsWith('スタイル')) {
    throw new Error('Invalid format')
  }

  const lines = data.split('\r\n')

  const [styleNameKey, ...styleNameValues] = lines[0].split('=')
  const [styleFileKey, ...styleFileValues] = lines[1].split('=')

  if (styleNameKey !== 'スタイル' || styleFileKey !== 'スタイルファイル') {
    console.log(styleNameKey, styleFileKey)
    throw new Error('Invalid format; style name or style file path is missing')
  }

  const styleName = styleNameValues.join('=')
  const styleFile = styleFileValues.join('=')

  if (lines[3] !== 'ローマ字設定=') {
    throw new Error('Invalid format; romaji setting is missing')
  }

  const romajiTable = lines.slice(4, -1)

  return {
    name: styleName,
    path: styleFile,
    entries: romajiTable.map(line => {
      const [, romajiZk, hiragana] =
        line.match(/^([^\s]+)\s+([^\s]+)\s*$/) ?? []

      if (!hiragana || !romajiZk) {
        console.log(line)
        throw new Error('Invalid format; hiragana or romaji is missing')
      }

      const romaji = jaconv.toHanAscii(romajiZk)

      return [romaji.trim(), hiragana.trim()]
    }),
  } satisfies RomajiTable
}
