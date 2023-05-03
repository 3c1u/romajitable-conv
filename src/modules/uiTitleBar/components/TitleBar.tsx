import { appWindow } from '@tauri-apps/api/window'
import { useCallback, useEffect, useState } from 'react'
import {
  DismissFilled,
  SquareMultipleRegular,
  SquareRegular,
  // SubtractRegular,
} from '@fluentui/react-icons'

const isTauri = '__TAURI__' in window

export const TitleBar = () => {
  const [isMaximized, setIsMaximized] = useState(false)

  const handleClose = useCallback(() => {
    appWindow.close()
  }, [])
  const handleMinimize = useCallback(() => {
    appWindow.minimize()
  }, [])
  const handleMaximize = useCallback(async () => {
    if (await appWindow.isMaximized()) {
      appWindow.unmaximize()
      return
    }

    appWindow.maximize()
  }, [])

  useEffect(() => {
    if (!isTauri) {
      return
    }

    const unsubscribe = appWindow.onResized(() => {
      appWindow.isMaximized().then(setIsMaximized)
    })

    appWindow.isMaximized().then(setIsMaximized)

    return () => {
      unsubscribe.then(unsubscribe => unsubscribe())
    }
  }, [])

  if (!isTauri) {
    return <></>
  }

  return (
    <div className="flex" onDoubleClick={handleMaximize}>
      <div data-tauri-drag-region className="px-4 py-2 text-xs">
        romajitable-conv
      </div>
      <div data-tauri-drag-region className="flex-1" />
      <div className="flex">
        <button
          className="flex items-center justify-center px-4 py-2 fill-white hover:bg-white/20 transition focus:outline-none"
          onClick={handleMinimize}
        >
          {
            // FIXME: SubtractRegularが表示されないので、自前でアイコンを用意する
            /*
            <SubtractRegular
              aria-label="Minimize the window"
              className="w-4 h-4"
            />
          */
          }
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <rect width="12" height="1" x="2" y="8" />
          </svg>
        </button>
        <button
          className="flex items-center justify-center px-4 py-2 fill-white hover:bg-white/20 transition focus:outline-none"
          onClick={handleMaximize}
        >
          {' '}
          {isMaximized ? (
            <SquareMultipleRegular
              aria-label="Maximize the window"
              className="w-4 h-4"
            />
          ) : (
            <SquareRegular
              aria-label="Maximize the window"
              className="w-4 h-4"
            />
          )}
        </button>
        <button
          className="flex items-center justify-center px-4 py-2 hover:bg-red-600 fill-white transition focus:outline-none"
          onClick={handleClose}
        >
          <DismissFilled aria-label="Close the window" className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
