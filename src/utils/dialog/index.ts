import type TauriDialog from '@tauri-apps/api/dialog'
import { MessageDialogOptions } from '@tauri-apps/api/dialog'

const tauriDialog =
  '__TAURI__' in window
    ? (
        window.__TAURI__ as {
          dialog: typeof TauriDialog
        }
      ).dialog
    : null

export const message = (
  message: string,
  options?: string | MessageDialogOptions,
) => {
  if (tauriDialog) {
    return tauriDialog.message(message, options)
  }

  return Promise.resolve()
}
