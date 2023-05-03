import type TauriFs from '@tauri-apps/api/fs'

let fs_: typeof TauriFs | undefined

if ('__TAURI__' in window) {
  await import('@tauri-apps/api/fs').then(i => {
    fs_ = i
  })
}

export const fs = fs_
