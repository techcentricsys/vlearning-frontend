import { useCallback, useEffect, useState } from "react"

/**
 * Chhota localStorage-backed store. Abhi backend nahi hai, isliye data browser mein save hota hai.
 * Backend banne par sirf is file ke andar API calls (axios) lagengi, pages nahi badlenge.
 */
export function useStore<T extends { id: string }>(key: string, seed: T[]) {
  const storageKey = `vlearning:${key}`
  const [items, setItems] = useState<T[]>(() => {
    try {
      const raw = localStorage.getItem(storageKey)
      return raw ? (JSON.parse(raw) as T[]) : seed
    } catch {
      return seed
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(items))
    } catch {
      /* storage full or blocked: ignore */
    }
  }, [items, storageKey])

  const add = useCallback((item: Omit<T, "id"> & { id?: string }) => {
    const created = { ...item, id: item.id ?? uid() } as T
    setItems((prev) => [created, ...prev])
    return created
  }, [])

  const update = useCallback((id: string, patch: Partial<T>) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i)))
  }, [])

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const reset = useCallback(() => setItems(seed), [seed])

  return { items, add, update, remove, reset, setItems }
}

export function uid() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4)
}

export const today = () => new Date().toISOString().slice(0, 10)

export function addDays(date: string, days: number) {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

export function daysBetween(from: string, to: string) {
  const ms = new Date(to).getTime() - new Date(from).getTime()
  return Math.round(ms / 86400000)
}

export const money = (n: number) => `Rs. ${Math.round(n).toLocaleString("en-PK")}`