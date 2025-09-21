import React from "react";
import BlogCard from "./BlogCard";

interface Post {
  id: string;
  title: string;
  slug: string;
  heroImage?: {
    url: string;
    alt?: string;
  };
  meta?: {
    description?: string;
  };
  categories?: Array<{
    title: string;
    slug: string;
  }>;
  publishedAt?: string;
}

interface BlogsProps {
  posts?: Post[];
  loading?: boolean;
  error?: string;
}

const Blogs: React.FC<BlogsProps> = ({ posts = [], loading = false, error }) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="flex gap-4 p-4">
              <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
              <div className="flex-1 space-y-2">
                <div className="flex gap-2">
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </div>
                <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
          <div className="text-red-600 text-4xl mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            Failed to load stories
          </h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 max-w-md mx-auto">
          <div className="text-gray-400 text-4xl mb-4">📝</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            No stories yet
          </h3>
          <p className="text-gray-600">
            Check back later for new content!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Blogs;