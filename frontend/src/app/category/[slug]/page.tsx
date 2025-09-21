import Blogs from "../../../Components/blog";
import Pagination from "../../../Components/Pagination";
import { apiClient } from "../../../lib/api";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    slug: string;
  };
  searchParams: {
    page?: string;
  };
}

export async function generateMetadata({ params }: PageProps) {
  try {
    const posts = await apiClient.fetchPosts({ category: params.slug, limit: 1 });
    const categoryName = posts.docs[0]?.categories?.[0]?.title || params.slug;
    
    return {
      title: `${categoryName} Stories - Postify Blog`,
      description: `Discover stories about ${categoryName}. Read insights, tutorials, and articles from our community.`,
    };
  } catch (error) {
    return {
      title: 'Category Not Found - Postify Blog',
      description: 'The requested category could not be found.',
    };
  }
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const currentPage = parseInt(searchParams.page || '1', 10);
  const limit = 10; // 10 posts per page

  try {
    const [posts, categories] = await Promise.all([
      apiClient.fetchPosts({ 
        category: params.slug, 
        limit, 
        page: currentPage, 
        depth: 1 
      }),
      apiClient.fetchCategories()
    ]);

    // Find the category name
    const category = categories.docs.find(cat => cat.slug === params.slug);
    const categoryName = category?.title || params.slug;

    if (!posts.docs || posts.docs.length === 0) {
      return (
        <div className="min-h-screen bg-white">
          <div className="container-medium py-12">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {categoryName}
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                No stories found in this category yet.
              </p>
              <a 
                href="/blog" 
                className="btn-primary"
              >
                Browse all stories
              </a>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-white">
        <div className="container-medium py-8">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <a href="/" className="hover:text-gray-900 transition-colors">Home</a>
              <span>→</span>
              <a href="/blog" className="hover:text-gray-900 transition-colors">Stories</a>
              <span>→</span>
              <span className="text-gray-900 font-medium">{categoryName}</span>
            </div>
          </nav>

          <header className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {categoryName}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl">
              Discover stories about {categoryName.toLowerCase()}. 
              Read insights, tutorials, and articles from our community.
            </p>
            <div className="mt-4 text-sm text-gray-500">
              Showing {posts.docs.length} of {posts.totalDocs} stories
              {posts.totalPages > 1 && ` (Page ${currentPage} of ${posts.totalPages})`}
            </div>
          </header>
          
          <Blogs posts={posts.docs} error={undefined} />
          
          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={posts.totalPages}
            baseUrl={`/category/${params.slug}`}
            hasNextPage={posts.hasNextPage}
            hasPrevPage={posts.hasPrevPage}
          />
          
          {/* Back to all stories */}
          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <a 
              href="/blog" 
              className="btn-secondary"
            >
              ← Back to all stories
            </a>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching category posts:', error);
    return (
      <div className="min-h-screen bg-white">
        <div className="container-medium py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Category Not Found
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              The requested category could not be found or there was an error loading the content.
            </p>
            <a 
              href="/blog" 
              className="btn-primary"
            >
              Browse all stories
            </a>
          </div>
        </div>
      </div>
    );
  }
}
