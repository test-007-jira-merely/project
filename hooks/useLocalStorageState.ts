'use client'

import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

export const STORAGE_SYNC_EVENT = 'portfolio-storage-sync'

const readRawValue = (key: string) => {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

const parseValue = <T,>(rawValue: string | null, fallback: T): T => {
  if (!rawValue) {
    return fallback
  }

  try {
    return JSON.parse(rawValue) as T
  } catch {
    return fallback
  }
}

export function useLocalStorageState<T>(
  key: string,
  initialValue: T,
): readonly [T, Dispatch<SetStateAction<T>>, boolean] {
  const [value, setValue] = useState<T>(initialValue)
  const [isHydrated, setIsHydrated] = useState(false)
  const initialValueRef = useRef(initialValue)
  const lastSerializedRef = useRef<string | null>(null)

  useEffect(() => {
    const rawValue = readRawValue(key)
    lastSerializedRef.current = rawValue
    setValue(parseValue(rawValue, initialValueRef.current))
    setIsHydrated(true)
  }, [key])

  useEffect(() => {
    if (!isHydrated || typeof window === 'undefined') {
      return
    }

    try {
      const serializedValue = JSON.stringify(value)

      if (serializedValue === lastSerializedRef.current) {
        return
      }

      window.localStorage.setItem(key, serializedValue)
      lastSerializedRef.current = serializedValue
      window.dispatchEvent(new CustomEvent(STORAGE_SYNC_EVENT, { detail: key }))
    } catch {
      // Ignore storage write failures and keep in-memory state available.
    }
  }, [isHydrated, key, value])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const syncValue = (changedKey?: string | null) => {
      if (changedKey && changedKey !== key) {
        return
      }

      const rawValue = readRawValue(key)
      if (rawValue === lastSerializedRef.current) {
        return
      }

      lastSerializedRef.current = rawValue
      setValue(parseValue(rawValue, initialValueRef.current))
    }

    const handleStorage = (event: StorageEvent) => {
      syncValue(event.key)
    }

    const handleCustomSync = (event: Event) => {
      const customEvent = event as CustomEvent<string>
      syncValue(customEvent.detail)
    }

    window.addEventListener('storage', handleStorage)
    window.addEventListener(STORAGE_SYNC_EVENT, handleCustomSync as EventListener)

    return () => {
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener(STORAGE_SYNC_EVENT, handleCustomSync as EventListener)
    }
  }, [key])

  return [value, setValue, isHydrated] as const
}
