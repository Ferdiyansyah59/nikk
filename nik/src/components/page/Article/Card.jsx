// import ImageComponent from "@/components/micro/ImageComponent";
// import Link from "next/link";

// function CardArticle() {
//     return ( <section className="grid grid-cols-[0.2fr_0.5fr_1fr]">
//         <div>
//             <p>Mei</p>
//             <span />
//             <p>05</p>
//         </div>
//         <div>
//             <ImageComponent className='w-64' src='/img/about.png' alt='Caba' />
//         </div>
//         <div>
//             <h1>Ini Sebuah Artikel</h1>
//             <p>KEMEJA KATUN SMOCK FURING FULL TRICODE PREMIUM COUPLE KEMEJA/TUNIK BATIK MODERNJAHITAN SMOCK/NONSMOCK SUPER PREMIUM</p>
//             <hr />
//             <Link href='/'>
//                 <p>View more</p>
//                 <p>----</p>
//             </Link>
//         </div>
//     </section> );
// }

// export default CardArticle;
// src/components/page/Article/Card.jsx
'use client';
// src/components/page/Article/Card.jsx
import { useEffect } from 'react';
import Link from 'next/link';
import useArticleStore from '@/store/articleStore';

function CardArticle() {
  const { articles, pagination, loading, error, fetchArticles, setPage } =
    useArticleStore();

  useEffect(() => {
    fetchArticles(pagination.page, pagination.limit);
  }, [fetchArticles, pagination.page, pagination.limit]);

  // Format date safely
  const formatDate = (dateString) => {
    if (!dateString) return { month: 'N/A', day: '-' };

    try {
      const date = new Date(dateString);

      // Check if date is valid
      if (isNaN(date.getTime())) {
        return { month: 'N/A', day: '-' };
      }

      return {
        month: date.toLocaleString('default', { month: 'short' }).toUpperCase(),
        day: date.getDate().toString(), // Convert to string to prevent NaN issues
      };
    } catch (error) {
      console.error('Date parsing error:', error);
      return { month: 'N/A', day: '-' };
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading articles...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-8">{error}</div>;
  }

  if (!articles || articles.length === 0) {
    return <div className="text-center p-8">No articles found.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold my-6">Articles</h1>

      {articles.map((article) => {
        const { month, day } = formatDate(article.created_At);

        return (
          <div
            key={article.id}
            className="bg-white shadow-sm rounded-lg mb-6 overflow-hidden"
          >
            <div className="flex flex-col md:flex-row">
              {/* Left column - Date */}
              <div className="w-full md:w-1/6 bg-gray-50 flex flex-col items-center justify-center p-3 border-r">
                <div className="text-gray-500 uppercase text-xs font-medium">
                  {month}
                </div>
                <div className="text-gray-700 text-5xl font-light">{day}</div>
              </div>

              {/* Middle column - Image */}
              <div className="w-full md:w-1/5">
                <div className="h-48 md:h-full relative">
                  {article.imageUrl ? (
                    <img
                      src={`http://localhost:8080${article.imageUrl}`}
                      alt={article.title}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gray-200">
                      <span className="text-gray-400">No image</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right column - Article details */}
              <div className="w-full md:w-3/5 p-4">
                <h2 className="text-xl font-medium text-gray-700 mb-1">
                  {article.title}
                </h2>
                <p className="text-sm text-gray-500 mb-3">
                  {article.created_At
                    ? new Date(article.created_At).toLocaleDateString()
                    : 'Date not available'}
                </p>

                <p className="text-sm text-gray-500 mb-4 line-clamp-3">
                  {article.excerpt || 'No excerpt available'}
                </p>

                <div className="mt-2">
                  <Link
                    href={`/articles/${article.slug}`}
                    className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
                  >
                    Read Full Article
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center my-8">
          <nav className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(Math.max(1, pagination.page - 1))}
              disabled={pagination.page === 1}
              className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
            >
              Previous
            </button>

            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 rounded ${
                    pagination.page === page
                      ? 'bg-blue-600 text-white'
                      : 'border border-gray-300'
                  }`}
                >
                  {page}
                </button>
              ),
            )}

            <button
              onClick={() =>
                handlePageChange(
                  Math.min(pagination.totalPages, pagination.page + 1),
                )
              }
              disabled={pagination.page === pagination.totalPages}
              className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}

export default CardArticle;
