"use client"
import React from 'react'
import Link from 'next/link'

interface SearchFiltersProps {
  query: string
  currentSort?: string
  currentCategory?: string
  categories?: Array<{
    id: string
    title: string
    slug: string
  }>
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ 
  query, 
  currentSort = 'relevance',
  currentCategory,
  categories = []
}) => {
  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'popular', label: 'Most Popular' }
  ]

  const buildUrl = (params: { sort?: string; category?: string }) => {
    const url = new URLSearchParams()
    if (query) url.set('q', query)
    if (params.sort) url.set('sort', params.sort)
    if (params.category) url.set('category', params.category)
    return `/search?${url.toString()}`
  }

  return (
    <div className="bg-gray-50 rounded-lg p-6 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Sort Options */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Sort by:</span>
          {sortOptions.map((option) => (
            <Link
              key={option.value}
              href={buildUrl({ sort: option.value, category: currentCategory })}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                currentSort === option.value
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {option.label}
            </Link>
          ))}
        </div>

        {/* Category Filters */}
        {categories.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Category:</span>
            <Link
              href={buildUrl({ sort: currentSort })}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                !currentCategory
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              All
            </Link>
            {categories.slice(0, 5).map((category) => (
              <Link
                key={category.id}
                href={buildUrl({ sort: currentSort, category: category.slug })}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  currentCategory === category.slug
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category.title}
              </Link>
            ))}
            {categories.length > 5 && (
              <span className="text-sm text-gray-500">
                +{categories.length - 5} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Active Filters */}
      {(currentSort !== 'relevance' || currentCategory) && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Active filters:</span>
            {currentSort !== 'relevance' && (
              <span className="inline-flex items-center px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                {sortOptions.find(opt => opt.value === currentSort)?.label}
                <Link
                  href={buildUrl({ category: currentCategory })}
                  className="ml-1 text-green-600 hover:text-green-800"
                >
                  ×
                </Link>
              </span>
            )}
            {currentCategory && (
              <span className="inline-flex items-center px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                {categories.find(cat => cat.slug === currentCategory)?.title || currentCategory}
                <Link
                  href={buildUrl({ sort: currentSort })}
                  className="ml-1 text-green-600 hover:text-green-800"
                >
                  ×
                </Link>
              </span>
            )}
            <Link
              href={buildUrl({})}
              className="text-sm text-gray-600 hover:text-gray-800 underline"
            >
              Clear all
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchFilters
