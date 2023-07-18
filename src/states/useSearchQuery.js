import create from 'zustand'
import { persist } from 'zustand/middleware'

let searchStore = set => ({

    query: "",
    savedQuery: (query) => set({ query }),
    clearQuery: () => set({ query: "" })

})

searchStore = persist(searchStore, {name: 'query'})

export const useSearchQuery = create(searchStore)
