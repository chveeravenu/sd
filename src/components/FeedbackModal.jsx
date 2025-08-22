// src/components/FeedbackModal.jsx
import React from 'react';
import { X, CheckCircle, XCircle } from 'lucide-react';

const StarRating = ({ rating, onRatingChange }) => {
  const stars = [...Array(5)].map((_, index) => {
    const starValue = index + 1;
    return (
      <span
        key={index}
        className={`cursor-pointer text-2xl ${
          starValue <= rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
        onClick={() => onRatingChange(starValue)}
      >
        ★
      </span>
    );
  });
  return <div>{stars}</div>;
};

const FeedbackModal = ({ show, onClose, formData, onFormChange, onSubmit, isSubmitting, submissionStatus }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75 transition-opacity duration-300">
      <div className="relative w-full max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-2xl transform transition-transform duration-300 scale-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <X size={24} />
        </button>
        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">Give Your Feedback</h2>
        <p className="text-center text-gray-500 mb-8">
          Help us improve our platform by sharing your experience.
        </p>

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Star Rating
            </label>
            <StarRating
              rating={formData.rating}
              onRatingChange={(newRating) => onFormChange({
                target: { name: 'rating', value: newRating }
              })}
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              placeholder="Tell us what you think..."
              value={formData.description}
              onChange={onFormChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-full shadow-sm text-lg font-semibold text-white transition-colors duration-200 ${
              isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </form>

        {submissionStatus && (
          <div className={`mt-6 p-4 rounded-lg flex items-center space-x-3 text-white ${
            submissionStatus === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}>
            {submissionStatus === 'success' ? <CheckCircle size={20} /> : <XCircle size={20} />}
            <span>
              {submissionStatus === 'success' ? 'Feedback submitted successfully!' : 'Failed to submit feedback. Please try again.'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackModal;