import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useSearchQuery = create(
    persist(
        (set) => ({
            query: "",
            savedQuery: (input) => set({ query: input })
        }),
        {
            name: 'query',
        }
    )
)
