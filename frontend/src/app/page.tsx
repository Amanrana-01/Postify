import Categories from "../Components/categories";
import Blogs from "../Components/blog";
import { apiClient } from "../lib/api";

export default async function Home() {
  try {
    const [categories, posts] = await Promise.all([
      apiClient.fetchCategories(),
      apiClient.fetchPosts({ limit: 6, depth: 1 }) // Show only 6 featured stories
    ]);

    return (
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-gray-50 to-white py-20">
          <div className="container-medium">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Ideas worth spreading
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Discover stories, thinking, and expertise from writers on any topic. 
                Start reading, start writing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/blog" 
                  className="btn-primary text-lg px-8 py-4"
                >
                  Start reading
                </a>
                <a 
                  href="/write" 
                  className="btn-secondary text-lg px-8 py-4"
                >
                  Start writing
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Categories */}
        <section className="py-16 bg-white">
          <div className="container-medium">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Explore topics
            </h2>
            <Categories categories={categories.docs} />
          </div>
        </section>

        {/* Featured Stories */}
        <section className="py-16 bg-gray-50">
          <div className="container-medium">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Featured stories
              </h2>
              <a 
                href="/blog" 
                className="text-green-600 hover:text-green-700 font-medium"
              >
                See all stories →
              </a>
            </div>
            <Blogs posts={posts.docs} error={undefined} />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="container-medium">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Join Postify
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Create an account to personalize your homepage, follow your favorite authors, 
                and get recommendations for stories you'll love.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/signup" 
                  className="btn-primary text-lg px-8 py-4"
                >
                  Get started
                </a>
                <a 
                  href="/demo" 
                  className="btn-secondary text-lg px-8 py-4"
                >
                  See Postify-style demo
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  } catch (error) {
    console.error('Error fetching data:', error);
    return (
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-gray-50 to-white py-20">
          <div className="container-medium">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Ideas worth spreading
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Discover stories, thinking, and expertise from writers on any topic. 
                Start reading, start writing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/blog" 
                  className="btn-primary text-lg px-8 py-4"
                >
                  Start reading
                </a>
                <a 
                  href="/write" 
                  className="btn-secondary text-lg px-8 py-4"
                >
                  Start writing
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Error State */}
        <section className="py-16 bg-white">
          <div className="container-medium">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Welcome to Postify
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                We're setting up some amazing content for you. Check back soon!
              </p>
              <a 
                href="/demo" 
                className="btn-primary text-lg px-8 py-4"
              >
                  See Postify-style demo
              </a>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
