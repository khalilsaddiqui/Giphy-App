import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchGifById } from '../utils/api';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

interface Feedback {
  rating: number;
  comment?: string;
}

const GifFeedback: React.FC = () => {
  const { gifId } = useParams<{ gifId: string }>();
  const navigate = useNavigate();
  const [gif, setGif] = useState<any>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const loadGif = async () => {
      try {
        const res = await fetchGifById(gifId!);
        setGif(res.data.data);
      } catch (err) {
        console.error('Error fetching GIF by ID:', err);
      }
    };

    loadGif();

    const saved = localStorage.getItem(`feedback-${gifId}`);
    if (saved) {
      const data: Feedback = JSON.parse(saved);
      setRating(data.rating);
      setComment(data.comment || '');
    }
  }, [gifId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Star rating is required.',
        confirmButtonColor: '#a855f7'
      });
      return;
    }
    const feedback: Feedback = { rating, comment };
    localStorage.setItem(`feedback-${gifId}`, JSON.stringify(feedback));
    Swal.fire({
      icon: 'success',
      title: 'Feedback Submitted',
      text: 'Your feedback was saved successfully!',
      confirmButtonColor: '#a855f7'
    });
  };

  if (!gif) return <p className="text-center mt-10 text-gray-600">Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="text-purple-600 hover:underline mb-4 block"
      >
        ← Back to list
      </button>
      <div className="bg-white rounded-lg shadow p-6">
        <img
          src={gif.images.original.url}
          alt={gif.title}
          className="w-full h-80 object-cover rounded mb-4"
        />
        <h2 className="text-xl font-bold mb-4 text-center text-gray-800">{gif.title || 'GIF Feedback'}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Star Rating (1–5) <span className="text-red-500">*</span></label>
            <input
              type="number"
              min={1}
              max={5}
              value={rating ?? ''}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="w-full border border-gray-300 rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-purple-300"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-5 py-2 rounded shadow"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default GifFeedback;