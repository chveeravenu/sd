import React, { useState } from 'react';
import { Play, BookOpen, Award, Users, Star, TrendingUp, X, CheckCircle, XCircle } from 'lucide-react';

// Ticket form modal component. This is now a separate component.
const TicketFormModal = ({ show, onClose, formData, onFormChange, onSubmit, isSubmitting, submissionStatus, categories }) => {
  if (!show) return null; // Only render if `show` is true

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75 transition-opacity duration-300">
      <div 
        className="relative w-full max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-2xl transform transition-transform duration-300 scale-100"
      >
        {/* Close button for the modal */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <X size={24} />
        </button>
        
        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">Raise a Ticket</h2>
        <p className="text-center text-gray-500 mb-8">
          Please fill out the form below to raise a ticket.
        </p>

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Case Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={onFormChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <textarea
              id="subject"
              name="subject"
              rows="4"
              placeholder="Briefly describe your issue so we can find you the best solution."
              value={formData.subject}
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
            {isSubmitting ? 'Submitting...' : 'Submit Ticket'}
          </button>
        </form>

        {/* Submission status message box */}
        {submissionStatus && (
          <div className={`mt-6 p-4 rounded-lg flex items-center space-x-3 text-white ${
            submissionStatus === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}>
            {submissionStatus === 'success' ? (
              <CheckCircle size={20} />
            ) : (
              <XCircle size={20} />
            )}
            <span>
              {submissionStatus === 'success'
                ? 'Ticket submitted successfully!'
                : 'Failed to submit ticket. Please try again.'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

// Main application component
const App = () => {
  // State to control the visibility of the modal.
  const [showModal, setShowModal] = useState(false);
  // State to store the form data.
  const [formData, setFormData] = useState({ category: 'Premium Issue', subject: '' });
  // State to handle submission status (success, error, loading).
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to handle opening the modal.
  const handleOpenModal = () => {
    setShowModal(true);
    // Reset form data and status when opening the modal
    setFormData({ category: 'Premium Issue', subject: '' });
    setSubmissionStatus(null);
  };

  // Function to handle closing the modal.
  const handleCloseModal = () => {
    setShowModal(false);
  };
  
  // Array of ticket categories for the dropdown.
  const categories = [
    'Premium Issue',
    'Payment Issue',
    'Video Issue',
    'Course Content',
    'Technical Support',
    'Other'
  ];

  // Function to handle form field changes.
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle form submission.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus(null);

    // This is the updated fetch call, pointing to your backend server
    try {
      const response = await fetch('http://localhost:4000/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmissionStatus('success');
      } else {
        setSubmissionStatus('error');
      }
    } catch (error) {
      console.error('Submission failed:', error);
      setSubmissionStatus('error');
    } finally {
      setIsSubmitting(false);
      // Automatically hide the message after a few seconds
      setTimeout(() => {
        setSubmissionStatus(null);
        handleCloseModal();
      }, 3000);
    }
  };
  
  return (
    <div className="bg-white text-gray-800 font-sans">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-800 text-white py-24">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight mb-4">
            Master New Skills with Expert-Led Courses
          </h1>
          <p className="text-lg md:text-xl font-light opacity-90 mb-8">
            Join thousands of learners worldwide. Access premium content,
            interactive lessons, and earn certificates from industry experts.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="w-full sm:w-auto px-8 py-3 rounded-full font-semibold text-blue-600 bg-white hover:bg-gray-100 transition-colors">
              Explore Courses
            </button>
            <button className="w-full sm:w-auto px-8 py-3 rounded-full font-semibold text-white border border-white hover:bg-white hover:text-blue-600 transition-colors">
              Go Premium
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">
            Why Choose LearnHub?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-lg transition-transform hover:scale-105 duration-300">
              <div className="p-4 bg-blue-100 rounded-full mb-4 text-blue-600">
                <Play size={36} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Video Learning</h3>
              <p className="text-gray-600">
                High-quality video content from industry experts. Learn at your own pace with interactive exercises and projects.
              </p>
            </div>
            {/* Feature Card 2 */}
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-lg transition-transform hover:scale-105 duration-300">
              <div className="p-4 bg-blue-100 rounded-full mb-4 text-blue-600">
                <Award size={36} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Certificates</h3>
              <p className="text-gray-600">
                Earn industry-recognized certificates upon course completion. Showcase your skills to employers and advance your career.
              </p>
            </div>
            {/* Feature Card 3 */}
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-lg transition-transform hover:scale-105 duration-300">
              <div className="p-4 bg-blue-100 rounded-full mb-4 text-blue-600">
                <Users size={36} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-gray-600">
                Connect with fellow learners, participate in discussions, and get help from our supportive community.
              </p>
            </div>
            {/* Feature Card 4 */}
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-lg transition-transform hover:scale-105 duration-300">
              <div className="p-4 bg-blue-100 rounded-full mb-4 text-blue-600">
                <BookOpen size={36} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Comprehensive Content</h3>
              <p className="text-gray-600">
                From beginner to advanced levels. Our courses cover everything you need to master your chosen field.
              </p>
            </div>
            {/* Feature Card 5 */}
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-lg transition-transform hover:scale-105 duration-300">
              <div className="p-4 bg-blue-100 rounded-full mb-4 text-blue-600">
                <TrendingUp size={36} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Career Growth</h3>
              <p className="text-gray-600">
                Advance your career with skills that are in demand. Get job-ready with practical, hands-on learning.
              </p>
            </div>
            {/* Feature Card 6 */}
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-lg transition-transform hover:scale-105 duration-300">
              <div className="p-4 bg-blue-100 rounded-full mb-4 text-blue-600">
                <Star size={36} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Experience</h3>
              <p className="text-gray-600">
                Unlock exclusive content, 1-on-1 mentoring, and priority support with our premium plans.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-12 text-gray-800">
            Join Our Growing Community
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div className="flex flex-col items-center p-4">
              <div className="text-4xl sm:text-5xl font-extrabold text-blue-600 mb-1">
                50K+
              </div>
              <div className="text-gray-600 text-sm sm:text-base">
                Active Learners
              </div>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="text-4xl sm:text-5xl font-extrabold text-blue-600 mb-1">
                500+
              </div>
              <div className="text-gray-600 text-sm sm:text-base">
                Expert Courses
              </div>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="text-4xl sm:text-5xl font-extrabold text-blue-600 mb-1">
                95%
              </div>
              <div className="text-gray-600 text-sm sm:text-base">
                Success Rate
              </div>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="text-4xl sm:text-5xl font-extrabold text-blue-600 mb-1">
                24/7
              </div>
              <div className="text-gray-600 text-sm sm:text-base">
                Support Available
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Raise Ticket Button */}
      <div className="fixed bottom-6 right-6">
        <button
          onClick={handleOpenModal}
          className="flex items-center space-x-2 px-6 py-3 rounded-full shadow-lg text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <span>Raise a Ticket</span>
        </button>
      </div>

      {/* Conditionally render the modal by passing props */}
      <TicketFormModal
        show={showModal}
        onClose={handleCloseModal}
        formData={formData}
        onFormChange={handleFormChange}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submissionStatus={submissionStatus}
        categories={categories}
      />
    </div>
  );
};

export default App;
