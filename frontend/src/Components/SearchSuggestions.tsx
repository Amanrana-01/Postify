"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Post } from '../lib/api'

interface SearchSuggestionsProps {
  posts: Post[]
  isLoading: boolean
  query: string
  onSuggestionClick: (post: Post) => void
  className?: string
}

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  posts,
  isLoading,
  query,
  onSuggestionClick,
  className = ""
}) => {
  if (!query.trim()) return null

  return (
    <div className={`absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto ${className}`}>
      {isLoading ? (
        <div className="px-4 py-3 text-center">
          <div className="flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 text-gray-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-sm text-gray-500">Searching...</span>
          </div>
        </div>
      ) : posts.length > 0 ? (
        <>
          <div className="px-4 py-2 text-xs font-medium text-gray-500 bg-gray-50 border-b border-gray-200">
            Top {posts.length} results for "{query}"
          </div>
          {posts.map((post, index) => (
            <button
              key={post.id}
              onClick={() => onSuggestionClick(post)}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-start space-x-3">
                {/* Post Image */}
                <div className="flex-shrink-0 w-16 h-16 relative">
                  {post.heroImage?.url ? (
                    <Image
                      src={`http://localhost:3000${post.heroImage.url}`}
                      alt={post.heroImage.alt || post.title}
                      fill
                      className="object-cover rounded-md"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center">
                      <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Post Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                    {post.title}
                  </h3>
                  {post.meta?.description && (
                    <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                      {post.meta.description}
                    </p>
                  )}
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    {post.categories && post.categories.length > 0 && (
                      <span className="px-2 py-1 bg-gray-100 rounded-full">
                        {post.categories[0].title}
                      </span>
                    )}
                    {post.publishedAt && (
                      <span>
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>

                {/* Arrow Icon */}
                <div className="flex-shrink-0">
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>
          ))}
          
          {/* View All Results Link */}
          <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
            <Link
              href={`/search?q=${encodeURIComponent(query)}`}
              className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center justify-center"
            >
              View all results for "{query}"
              <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          </div>
        </>
      ) : (
        <div className="px-4 py-3 text-center">
          <svg className="mx-auto h-8 w-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p className="text-sm text-gray-500">No stories found for "{query}"</p>
        </div>
      )}
    </div>
  )
}

export default SearchSuggestions
