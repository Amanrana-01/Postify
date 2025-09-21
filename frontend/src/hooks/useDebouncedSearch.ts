import { useState, useEffect, useCallback } from 'react'
import { apiClient, Post } from '../lib/api'

interface UseDebouncedSearchProps {
  delay?: number
  limit?: number
}

interface UseDebouncedSearchReturn {
  setIsLoading: (isLoading: boolean) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  searchResults: Post[]
  isLoading: boolean
  error: string | null
  clearSearch: () => void
}

export const useDebouncedSearch = ({ 
  delay = 300, 
  limit = 3 
}: UseDebouncedSearchProps = {}): UseDebouncedSearchReturn => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const performSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      setIsLoading(false)
      setError(null)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await apiClient.fetchPosts({
        search: query,
        limit,
        page: 1,
        depth: 1,
        select: ['title', 'slug'],
      })
      
      setSearchResults(response.docs)
    } catch (err) {
      console.error('Search error:', err)
      setError('Failed to search stories')
      setSearchResults([])
    } finally {
      setIsLoading(false)
    }
  }, [limit])

  // Debounce the search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(searchQuery)
    }, delay)

    return () => clearTimeout(timeoutId)
  }, [searchQuery, performSearch, delay])

  const clearSearch = useCallback(() => {
    setSearchQuery('')
    setSearchResults([])
    setError(null)
    setIsLoading(false)
  }, [])

  return {
    setIsLoading,
    searchQuery,
    setSearchQuery,
    searchResults,
    isLoading,
    error,
    clearSearch
  }
}
