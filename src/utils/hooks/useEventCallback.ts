/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCallback, useEffect, useRef } from 'react'

/**
 * Wraps a function from props in a ref so that it can be used without triggering a re-render.
 * This is useful for event handlers that are called inside async functions.
 *
 * @param fn A function that will be called when the event is triggered.
 * @returns A wrapped function.
 */
export const useEventCallback = <F extends (...args: any[]) => any>(fn?: F) => {
  const refCallback = useRef(fn)

  useEffect(() => {
    refCallback.current = fn
  }, [fn])

  const wrappedCallback = useCallback((...args: Parameters<F>) => {
    return refCallback.current?.(...args)
  }, [])

  return wrappedCallback as F
}
