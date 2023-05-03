import type TauriDialog from '@tauri-apps/api/dialog'
import { MessageDialogOptions } from '@tauri-apps/api/dialog'

let tauriDialog: typeof TauriDialog | undefined

if ('__TAURI__' in window) {
  void import('@tauri-apps/api/dialog').then(dialog => {
    tauriDialog = dialog
  })
}

export const message = (
  message: string,
  options: string | MessageDialogOptions = 'Romaji Table Converter',
) => {
  if (tauriDialog) {
    return tauriDialog.message(message, options)
  }

  return Promise.resolve()
}
