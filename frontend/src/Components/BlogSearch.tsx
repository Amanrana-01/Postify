"use client"
import React, { useState, useMemo, useRef, useEffect } from 'react'
import { Post } from '../lib/api'
import { useDebouncedSearch } from '../hooks/useDebouncedSearch'
import SearchSuggestions from './SearchSuggestions'

interface BlogSearchProps {
  posts: Post[]
  onFilteredPosts: (filteredPosts: Post[]) => void
  className?: string
}

const BlogSearch: React.FC<BlogSearchProps> = ({ 
  posts, 
  onFilteredPosts, 
  className = "" 
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    isLoading,
    error,
    clearSearch
  } = useDebouncedSearch({ delay: 300, limit: 3 })

  // Filter posts based on search query for main results
  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) {
      return posts
    }

    const query = searchQuery.toLowerCase().trim()
    return posts.filter(post => 
      post.title.toLowerCase().includes(query) ||
      (post.meta?.description && post.meta.description.toLowerCase().includes(query)) ||
      (post.categories && post.categories.some(cat => 
        cat.title.toLowerCase().includes(query)
      ))
    )
  }, [posts, searchQuery])

  // Update parent component when filtered posts change
  useEffect(() => {
    onFilteredPosts(filteredPosts)
  }, [filteredPosts, onFilteredPosts])

  // Handle clicks outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    setShowSuggestions(value.trim().length > 0)
  }

  const handleSuggestionClick = (post: Post) => {
    // Navigate to the post
    window.location.href = `/blog/${post.slug}`
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowSuggestions(false)
      setSearchQuery('')
    }
  }

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          onFocus={() => searchQuery.trim() && setShowSuggestions(true)}
          placeholder="Search stories by title, description, or category..."
          className="w-full px-4 py-3 pl-12 pr-12 text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 shadow-sm"
        />
        
        {/* Search Icon */}
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          {isLoading ? (
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

        {/* Clear Button */}
        {searchQuery && (
          <button
            onClick={() => {
              clearSearch()
              setShowSuggestions(false)
              inputRef.current?.focus()
            }}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
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
      {showSuggestions && (
        <SearchSuggestions
          posts={searchResults}
          isLoading={isLoading}
          query={searchQuery}
          onSuggestionClick={handleSuggestionClick}
        />
      )}

      {/* Search Results Summary - Only show when not showing suggestions */}
      {searchQuery && !showSuggestions && (
        <div className="mt-3 text-sm text-gray-600">
          {filteredPosts.length === posts.length ? (
            <span>Showing all {posts.length} stories</span>
          ) : (
            <span>
              Found {filteredPosts.length} of {posts.length} stories matching "{searchQuery}"
            </span>
          )}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* No Results Message - Only show when not showing suggestions */}
      {searchQuery && !showSuggestions && filteredPosts.length === 0 && (
        <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            No stories found
          </h3>
          <p className="text-gray-600 mb-3">
            We couldn't find any stories matching "{searchQuery}".
          </p>
          <button
            onClick={() => {
              clearSearch()
              setShowSuggestions(false)
            }}
            className="text-green-600 hover:text-green-700 font-medium text-sm"
          >
            Clear search to see all stories
          </button>
        </div>
      )}
    </div>
  )
}

export default BlogSearch
