import BlogPageClient from "../../Components/BlogPageClient";
import { apiClient } from "../../lib/api";

interface PageProps {
  searchParams: {
    page?: string;
  };
}

export default async function BlogPage({ searchParams }: PageProps) {
  const currentPage = parseInt(searchParams.page || '1', 10);
  const limit = 10; // 10 posts per page

  try {
    const [posts, categories] = await Promise.all([
      apiClient.fetchPosts({ 
        limit, 
        page: currentPage, 
        depth: 1 
      }),
      apiClient.fetchCategories()
    ]);

    return (
      <BlogPageClient
        initialPosts={posts.docs}
        categories={categories.docs}
        currentPage={currentPage}
        totalPages={posts.totalPages}
        hasNextPage={posts.hasNextPage}
        hasPrevPage={posts.hasPrevPage}
        totalDocs={posts.totalDocs}
      />
    );
  } catch (error) {
    console.error('Error fetching blog posts:', error);
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
          </header>
          
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <svg className="mx-auto h-16 w-16 text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Failed to load stories
              </h3>
              <p className="text-gray-600 mb-6">
                There was an error loading the stories. Please try again.
              </p>
              <a 
                href="/blog" 
                className="btn-primary"
              >
                Try again
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
