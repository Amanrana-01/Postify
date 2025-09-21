import Blogs from "../../Components/blog";
import SearchBar from "../../Components/SearchBar";
import SearchFilters from "../../Components/SearchFilters";
import Pagination from "../../Components/Pagination";
import { apiClient } from "../../lib/api";
import { notFound } from "next/navigation";

interface PageProps {
  searchParams: {
    q?: string;
    page?: string;
    sort?: string;
    category?: string;
  };
}

export async function generateMetadata({ searchParams }: PageProps) {
  const query = searchParams.q;
  
  if (!query) {
    return {
      title: 'Search Stories - Postify Blog',
      description: 'Search through our collection of stories, tutorials, and articles.',
    };
  }

  return {
    title: `Search results for "${query}" - Postify Blog`,
    description: `Find stories, tutorials, and articles about ${query}. Discover insights from our community.`,
  };
}

export default async function SearchPage({ searchParams }: PageProps) {
  const query = searchParams.q || '';
  const currentPage = parseInt(searchParams.page || '1', 10);
  const currentSort = searchParams.sort || 'relevance';
  const currentCategory = searchParams.category || '';
  const limit = 10; // 10 results per page

  // If no query, show search interface
  if (!query.trim()) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container-medium py-12">
          <header className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Search Stories
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover insights, tutorials, and stories from our community. 
              Search through our collection of articles.
            </p>
          </header>
          
          <div className="max-w-2xl mx-auto">
            <SearchBar 
              placeholder="Search for stories, tutorials, or topics..."
              className="w-full"
              showSuggestions={true}
            />
          </div>

          {/* Popular Search Terms */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Popular Searches
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                'JavaScript',
                'React',
                'Web Design',
                'Programming',
                'Technology',
                'Tutorials',
                'Frontend',
                'Backend',
                'CSS',
                'Node.js'
              ].map((term) => (
                <a
                  key={term}
                  href={`/search?q=${encodeURIComponent(term)}`}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 rounded-full text-sm font-medium transition-colors duration-200 border border-gray-200 hover:border-gray-300"
                >
                  {term}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  try {
    const [posts, categories] = await Promise.all([
      apiClient.fetchPosts({ 
        search: query,
        category: currentCategory || undefined,
        limit, 
        page: currentPage, 
        depth: 1 
      }),
      apiClient.fetchCategories()
    ]);

    return (
      <div className="min-h-screen bg-white">
        <div className="container-medium py-12">
          <header className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Search Results
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mb-6">
              Results for "<span className="font-semibold text-gray-900">{query}</span>"
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl">
              <SearchBar 
                placeholder="Search for more stories..."
                className="w-full"
                showSuggestions={true}
              />
            </div>
          </header>

          {/* Search Filters */}
          <SearchFilters
            query={query}
            currentSort={currentSort}
            currentCategory={currentCategory}
            categories={categories.docs}
          />

          {/* Results Summary */}
          <div className="mb-8">
            <div className="text-sm text-gray-500">
              {posts.docs.length > 0 ? (
                <>
                  Showing {posts.docs.length} of {posts.totalDocs} results
                  {posts.totalPages > 1 && ` (Page ${currentPage} of ${posts.totalPages})`}
                </>
              ) : (
                'No results found'
              )}
            </div>
          </div>

          {/* Search Results */}
          {posts.docs.length > 0 ? (
            <>
              <Blogs posts={posts.docs} error={undefined} />
              
              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={posts.totalPages}
                baseUrl={`/search?q=${encodeURIComponent(query)}`}
                hasNextPage={posts.hasNextPage}
                hasPrevPage={posts.hasPrevPage}
              />
            </>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No stories found
                </h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any stories matching "{query}". 
                  Try different keywords or browse our categories.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a 
                    href="/blog" 
                    className="btn-primary"
                  >
                    Browse all stories
                  </a>
                  <a 
                    href="/search" 
                    className="btn-secondary"
                  >
                    Try another search
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error searching posts:', error);
    return (
      <div className="min-h-screen bg-white">
        <div className="container-medium py-12">
          <header className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Search Results
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mb-6">
              Results for "<span className="font-semibold text-gray-900">{query}</span>"
            </p>
          </header>
          
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <svg className="mx-auto h-16 w-16 text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Search Error
              </h3>
              <p className="text-gray-600 mb-6">
                There was an error searching for stories. Please try again.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a 
                  href="/search" 
                  className="btn-primary"
                >
                  Try again
                </a>
                <a 
                  href="/blog" 
                  className="btn-secondary"
                >
                  Browse all stories
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
