import { MessageDialogOptions } from '@tauri-apps/api/dialog'
import { dialog } from '~/vendor/tauri/dialog'

export const message = (
  message: string,
  options: string | MessageDialogOptions = 'Romaji Table Converter',
) => {
  return dialog?.message(message, options)
}
