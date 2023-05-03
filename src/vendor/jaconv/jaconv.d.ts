declare module 'jaconv' {
  interface jaconv {
    /**
     * 全角ひらがなをヘボン式ローマ字で半角英文字に変換します。
     */
    toHebon(s: string): string
    /**
     * 全角ひらがなを全角カタカナに変換します。
     */
    toKatakana(s: string): string
    /**
     * 全角カタカナを全角ひらがなに変換します。
     */
    toHiragana(s: string): string
    /**
     * 全角英数記号を半角に変換します。
     */
    toHanAscii(s: string): string
    /**
     * 半角英数記号を全角に変換します。
     */
    toZenAscii(s: string): string
    /**
     * 全角カタカナを半角に変換します。
     */
    toHanKana(s: string): string
    /**
     * 半角カタカナを全角に変換します。
     */
    toZenKana(s: string): string
    /**
     * 全角英数記号、カタカナを半角に変換します。
     * (toHanAscii, toHanKana の組み合わせ)
     */
    toHan(s: string): string
    /**
     * 半角英数記号、カタカナを全角に変換します。
     * (toZenAscii, toZenKana の組み合わせ)
     */
    toZen(s: string): string
    /**
     * 全角英数記号を半角に、半角カタカナを全角に変換します。
     * (toHanAscii, toZenKana の組み合わせ)
     */
    normalize(s: string): string
  }

  const jaconv: jaconv
  export default jaconv
}
