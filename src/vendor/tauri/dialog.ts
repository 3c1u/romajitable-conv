import type TauriDialog from '@tauri-apps/api/dialog'

let dialog_: typeof TauriDialog | undefined

if ('__TAURI__' in window) {
  await import('@tauri-apps/api/dialog').then(d => {
    dialog_ = d
  })
}

export const dialog = dialog_
