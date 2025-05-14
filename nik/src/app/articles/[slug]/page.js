// src/app/articles/[slug]/page.jsx
'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import useArticleStore from '@/store/articleStore';
import { formatDate } from '@/utils/dateFormatter';

export default function ArticleDetail() {
  const params = useParams();
  const router = useRouter();
  const { slug } = params;

  const { article, loading, error, fetchArticleBySlug } = useArticleStore();

  useEffect(() => {
    if (slug) {
      fetchArticleBySlug(slug);
    }
  }, [fetchArticleBySlug, slug]);

  if (loading) {
    return <div className="flex justify-center p-12">Loading article...</div>;
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <div className="text-red-500 mb-4">{error}</div>
        <Link href="/" className="text-blue-600 hover:underline">
          Return to Articles
        </Link>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <div className="text-gray-500 mb-4">Article not found</div>
        <Link href="/" className="text-blue-600 hover:underline">
          Return to Articles
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link href="/" className="text-blue-600 hover:underline">
          &larr; Back to Articles
        </Link>
      </div>

      <article className="bg-white shadow-lg rounded-lg overflow-hidden">
        {article.imageUrl && (
          <div className="relative h-72 w-full">
            <img
              src={`http://localhost:8080${article.imageUrl}`}
              alt={article.title}
              className="object-cover w-full h-full"
            />
          </div>
        )}

        <div className="p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {article.title}
          </h1>

          <div className="text-sm text-gray-500 mb-6">
            Published: {formatDate(article.createdAt)}
          </div>

          <div className="prose max-w-none">
            <p className="text-lg font-medium text-gray-700 mb-6">
              {article.excerpt}
            </p>

            <div className="whitespace-pre-line text-gray-800">
              {article.description.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
