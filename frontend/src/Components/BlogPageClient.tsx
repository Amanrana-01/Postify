"use client"
import React, { useState } from 'react'
import Blogs from "./blog";
import Categories from "./categories";
import BlogSearch from "./BlogSearch";
import Pagination from "./Pagination";
import { Post, Category } from '../lib/api'

interface BlogPageClientProps {
  initialPosts: Post[]
  categories: Category[]
  currentPage: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
  totalDocs: number
}

const BlogPageClient: React.FC<BlogPageClientProps> = ({
  initialPosts,
  categories,
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
  totalDocs
}) => {
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(initialPosts)
  const [isSearching, setIsSearching] = useState(false)

  const handleFilteredPosts = (posts: Post[]) => {
    setFilteredPosts(posts)
    setIsSearching(posts.length !== initialPosts.length)
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container-medium py-12">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Stories
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Discover insights, tutorials, and stories from our community. 
            Stay updated with the latest trends and technologies.
          </p>
          <div className="mt-4 text-sm text-gray-500">
            {isSearching ? (
              <span>
                Showing {filteredPosts.length} of {totalDocs} stories
                {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
              </span>
            ) : (
              <span>
                Showing {filteredPosts.length} of {totalDocs} stories
                {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
              </span>
            )}
          </div>
        </header>
        
        {/* Search Bar */}
        <div className="mb-8">
          <BlogSearch 
            posts={initialPosts}
            onFilteredPosts={handleFilteredPosts}
            className="max-w-2xl"
          />
        </div>
        
        {/* Categories Filter */}
        <div className="mb-12">
          <Categories categories={categories} />
        </div>
        
        <Blogs posts={filteredPosts} error={undefined} />
        
        {/* Pagination - Only show when not searching */}
        {!isSearching && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            baseUrl="/blog"
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
          />
        )}
      </div>
    </div>
  )
}

export default BlogPageClient
