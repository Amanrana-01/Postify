"use client"
import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useDebouncedSearch } from '@/hooks/useDebouncedSearch'
import { Post } from '@/lib/api'

interface SearchBarProps {
  placeholder?: string
  className?: string
  showSuggestions?: boolean
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder = "Search stories...", 
  className = "",
  showSuggestions = true
}) => {
  
  const [isOpen, setIsOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Sample suggestions - in a real app, these would come from an API
  const sampleSuggestions = [
    'JavaScript tutorials',
    'React development',
    'Web design tips',
    'Programming guides',
    'Technology news',
    'Coding best practices',
    'Frontend development',
    'Backend architecture'
  ]
const {searchQuery, setSearchQuery, searchResults, isLoading: isLoadingSearch, error, clearSearch, setIsLoading} = useDebouncedSearch({ delay: 300, limit: 3 })
console.log(searchResults)
useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (searchQuery: string ) => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setIsOpen(false)
      setSearchQuery('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(searchQuery)
    } else if (e.key === 'Escape') {
      setIsOpen(false)
      setSearchQuery('')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsOpen(true)
    const value = e.target.value
    setSearchQuery(value)
    
  }

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion)
    handleSearch(suggestion)
  }

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          onFocus={() => searchQuery && setIsOpen(true)}
          placeholder={placeholder}
          className="w-full px-4 py-2 pl-10 pr-4 text-gray-900 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {isLoadingSearch ? (
            <svg className="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
        </div>
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery('')
              setIsOpen(false)
              inputRef.current?.focus()
            }}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
            title="Clear search"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Search Suggestions Dropdown */}
        {isOpen && searchResults.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {searchResults.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion.title)}
              className="w-full px-4 py-3 text-left text-gray-900 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors"
            >
              <div className="flex items-center">
                <svg className="h-4 w-4 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="text-sm">{suggestion.title}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* No Results Message */}
      {isOpen && searchQuery && !isLoadingSearch  && searchResults.length === 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="px-4 py-3 text-sm text-gray-500 text-center">
            No suggestions found for "{searchQuery}"
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchBar