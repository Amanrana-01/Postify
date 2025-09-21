"use client"
import React from 'react'
import Link from 'next/link'

interface PaginationProps {
  currentPage: number
  totalPages: number
  baseUrl: string
  hasNextPage: boolean
  hasPrevPage: boolean
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  baseUrl,
  hasNextPage,
  hasPrevPage
}) => {
  // Don't show pagination if there's only one page
  if (totalPages <= 1) return null

  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Show pages with ellipsis
      if (currentPage <= 3) {
        // Show first 4 pages + ellipsis + last page
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        // Show first page + ellipsis + last 4 pages
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        // Show first page + ellipsis + current-1, current, current+1 + ellipsis + last page
        pages.push(1)
        pages.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      }
    }
    
    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <nav className="flex items-center justify-center space-x-2 mt-12" aria-label="Pagination">
      {/* Previous Button */}
      {hasPrevPage ? (
        <Link
          href={currentPage === 2 ? baseUrl : `${baseUrl}?page=${currentPage - 1}`}
          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-700 transition-colors"
        >
          ← Previous
        </Link>
      ) : (
        <span className="px-3 py-2 text-sm font-medium text-gray-300 bg-gray-50 border border-gray-200 rounded-md cursor-not-allowed">
          ← Previous
        </span>
      )}

      {/* Page Numbers */}
      <div className="flex space-x-1">
        {pageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-3 py-2 text-sm font-medium text-gray-500"
              >
                ...
              </span>
            )
          }

          const isCurrentPage = page === currentPage
          const pageUrl = page === 1 ? baseUrl : `${baseUrl}?page=${page}`

          return (
            <Link
              key={page}
              href={pageUrl}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isCurrentPage
                  ? 'bg-green-600 text-white'
                  : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {page}
            </Link>
          )
        })}
      </div>

      {/* Next Button */}
      {hasNextPage ? (
        <Link
          href={`${baseUrl}?page=${currentPage + 1}`}
          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-700 transition-colors"
        >
          Next →
        </Link>
      ) : (
        <span className="px-3 py-2 text-sm font-medium text-gray-300 bg-gray-50 border border-gray-200 rounded-md cursor-not-allowed">
          Next →
        </span>
      )}
    </nav>
  )
}

export default Pagination
