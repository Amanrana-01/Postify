import Image from "next/image";
import Link from "next/link";
import React from "react";
import { notFound } from "next/navigation";
import { apiClient, Post } from "../../../lib/api";
import RichText from "../../../Components/RichText";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps) {
  const post = await apiClient.fetchPost(params.slug);
  
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
  const post = await apiClient.fetchPost(params.slug);

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
console.log(post);
  return (
    <div className="min-h-screen bg-white">
      <div className="container-medium py-8">
        <Link 
          href="/" 
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-8"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>

        <article className="max-w-4xl mx-auto">
          {post.heroImage?.url && (
            <div className="relative w-full h-96 overflow-hidden rounded-lg mb-8">
              <Image 
                src={"http://localhost:3000"+post.heroImage.url}
                alt={post.heroImage.alt || post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              />
            </div>
          )}

          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories?.map((category, index) => (
                <span 
                  key={index}
                  className="inline-block px-3 py-1 text-sm font-medium bg-gray-100 text-gray-700 rounded-full"
                >
                  {category.title}
                </span>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            {post.meta?.description && (
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {post.meta.description}
              </p>
            )}

            <div className="flex items-center justify-between text-sm text-gray-500 mb-8 pb-6 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                {post.populatedAuthors?.map((author, index) => (
                  <span key={index} className="font-medium text-gray-900">
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
        </article>
      </div>
    </div>
  );
};

export default page;
