import Image from "next/image";
import Link from "next/link";
import React from "react";
import { notFound } from "next/navigation";
import { apiClient, Post } from "../../lib/api";
import RichText from "../../Components/RichText";

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: PageProps) {
  const post = await apiClient.fetchPostById(params.id);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.meta?.description || post.title,
    openGraph: {
      title: post.title,
      description: post.meta?.description || post.title,
      images: post.heroImage?.url ? [post.heroImage.url] : [],
    },
  };
}

const page = async ({ params }: PageProps) => {
  const post = await apiClient.fetchPostById(params.id);

  if (!post) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Link 
          href="/" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors mb-8"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>

        <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          {post.heroImage?.url && (
            <div className="relative w-full h-96 overflow-hidden">
              <Image 
                src={post.heroImage.url}
                alt={post.heroImage.alt || post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              />
            </div>
          )}

          <div className="p-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories?.map((category, index) => (
                <span 
                  key={index}
                  className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
                >
                  {category.title}
                </span>
              ))}
            </div>

            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {post.title}
            </h1>

            {post.meta?.description && (
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                {post.meta.description}
              </p>
            )}

            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                {post.populatedAuthors?.map((author, index) => (
                  <span key={index} className="font-medium">
                    {author.name}
                  </span>
                ))}
              </div>
              {post.publishedAt && (
                <time dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
              )}
            </div>

            <div>
              {post.content && (
                <RichText 
                  data={post.content} 
                  enableGutter={false}
                  enableProse={false}
                />
              )}
            </div>
          </div>
        </article>
    </div>
  );
};

export default page;