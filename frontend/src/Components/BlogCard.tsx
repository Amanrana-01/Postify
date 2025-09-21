import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface BlogCardProps {
  post: {
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
  };
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <article className="group">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="flex gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
          {/* Image */}
          <div className="flex-shrink-0 w-20 h-20 relative overflow-hidden rounded-lg">
            {post.heroImage?.url ? (
              <Image 
                src={"http://localhost:3000"+post.heroImage.url}
                alt={post.heroImage.alt || post.title}
                fill
                className="object-cover"
                sizes="80px"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <span className="text-gray-500 text-lg">📝</span>
              </div>
            )}
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              {post.categories?.slice(0, 1).map((category, index) => (
                <span 
                  key={index}
                  className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-full"
                >
                  {category.title}
                </span>
              ))}
              {post.publishedAt && (
                <span className="text-xs text-gray-500">
                  {formatDate(post.publishedAt)}
                </span>
              )}
            </div>
            
            <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
              {post.title}
            </h2>
            
            {post.meta?.description && (
              <p className="text-sm text-gray-600 line-clamp-2">
                {post.meta.description}
              </p>
            )}
          </div>
        </div>
      </Link>
    </article>
  )
}

export default BlogCard;