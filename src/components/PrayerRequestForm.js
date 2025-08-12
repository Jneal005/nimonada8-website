import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDatabase } from '../hooks/useDatabase';
import { useAuthContext } from './AuthProvider';

const PrayerRequestForm = () => {
  const [name, setName] = useState('');
  const [request, setRequest] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const { insertData } = useDatabase();
  const { user } = useAuthContext();

  // Daily verse and reflection
  const dailyVerse = {
    text: "The LORD is my strength and my shield; my heart trusts in him, and he helps me.",
    reference: "Psalm 28:7",
    reflection: "God is our ultimate source of strength and protection. When we place our trust in Him, He provides the help we need."
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      await insertData('prayer_requests', {
        name,
        request,
        is_public: isPublic,
        user_id: user?.id,
        created_at: new Date().toISOString(),
      });
      
      setSuccess(true);
      setName('');
      setRequest('');
      setIsPublic(false);
      
      // Reset success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError('Failed to submit prayer request. Please try again.');
      console.error('Prayer request error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-lemonYellow to-limeGreen py-4 px-6">
        <h2 className="text-2xl font-bold text-gray-900">Prayer Request</h2>
      </div>
      
      <div className="p-6">
        {/* Daily Verse Section */}
        <div className="mb-8 bg-gray-50 rounded-lg p-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Daily Verse</h3>
          <blockquote className="italic text-gray-700 border-l-4 border-lemonYellow pl-4 py-2 mb-3">
            "{dailyVerse.text}" - {dailyVerse.reference}
          </blockquote>
          <p className="text-gray-600">{dailyVerse.reflection}</p>
        </div>
        
        {success ? (
          <motion.div 
            className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Your prayer request has been submitted. We'll be praying for you!
          </motion.div>
        ) : error ? (
          <motion.div 
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.div>
        ) : null}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange"
              required
            />
          </div>
          
          <div>
            <label htmlFor="request" className="block text-sm font-medium text-gray-700 mb-1">
              Prayer Request
            </label>
            <textarea
              id="request"
              value={request}
              onChange={(e) => setRequest(e.target.value)}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange"
              required
            ></textarea>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isPublic"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="h-4 w-4 text-orange focus:ring-orange border-gray-300 rounded"
            />
            <label htmlFor="isPublic" className="ml-2 block text-sm text-gray-700">
              Make this prayer request public (shared anonymously with our community)
            </label>
          </div>
          
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-orange hover:bg-orange/90 text-white font-medium py-2 px-4 rounded-md transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Prayer Request'}
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default PrayerRequestForm;