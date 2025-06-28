import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { fetchTrendingGifs, fetchSearchGifs } from '../utils/api';
import { Gif } from '../types/gif';

const LIMIT = 15;

const GifList: React.FC = () => {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadGifs = async () => {
    setLoading(true);
    const offset = page * LIMIT;
    try {
      const res = query
        ? await fetchSearchGifs(query, offset, LIMIT)
        : await fetchTrendingGifs(offset, LIMIT);

      const data = res.data.data as Gif[];
      if (data.length < LIMIT) setHasMore(false);
      setGifs((prev) => (page === 0 ? data : [...prev, ...data]));
    } catch (err) {
      console.error('Error loading GIFs:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadGifs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, query]);

  const handleScroll = useCallback(
    debounce(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100 &&
        !loading &&
        hasMore
      ) {
        setPage((prev) => prev + 1);
      }
    }, 300),
    [loading, hasMore]
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setGifs([]);
    setPage(0);
    setHasMore(true);
    setQuery(search.trim());
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <form onSubmit={handleSearch} className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search GIFs..."
          className="border border-purple-400 p-3 w-full rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
        />
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {gifs.map((gif) => (
          <Link
            to={`/feedback/${gif.id}`}
            key={gif.id}
            className="group block border border-gray-200 bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition duration-300 overflow-hidden"
          >
            <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded">
              <img
                src={gif.images.original.url}
                alt={gif.title}
                className="h-64 w-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h2 className="mt-2 text-lg font-semibold text-center text-gray-700 line-clamp-2">
              {gif.title || 'Untitled GIF'}
            </h2>
          </Link>
        ))}
      </div>
      {loading && <p className="text-center mt-6 text-purple-600 font-medium">Loading more GIFs...</p>}
    </div>
  );
};

export default GifList;