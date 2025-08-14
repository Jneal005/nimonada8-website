import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDatabase } from '../hooks/useDatabase';
import emailjs from '@emailjs/browser';

const PrayerRequestForm = () => {
  const [name, setName] = useState('');
  const [request, setRequest] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [showPublicRequests, setShowPublicRequests] = useState(false);
  const [publicRequests, setPublicRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const { insertData, fetchData } = useDatabase();

  // Daily verse and reflection
  const dailyVerse = {
    text: "The LORD is my strength and my shield; my heart trusts in him, and he helps me.",
    reference: "Psalm 28:7",
    reflection: "God is our ultimate source of strength and protection. When we place our trust in Him, He provides the help we need."
  };

  // Fetch public prayer requests
  const fetchPublicRequests = async () => {
    setLoadingRequests(true);
    try {
      const data = await fetchData('prayer_requests', {
        filters: [{ column: 'is_public', operator: 'eq', value: true }],
        orderBy: { column: 'created_at', ascending: false },
        limit: 20
      });
      setPublicRequests(data || []);
    } catch (err) {
      console.error('Error fetching public requests:', err);
    } finally {
      setLoadingRequests(false);
    }
  };

  // Toggle public requests dropdown
  const togglePublicRequests = () => {
    if (!showPublicRequests && publicRequests.length === 0) {
      fetchPublicRequests();
    }
    setShowPublicRequests(!showPublicRequests);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Store in database
      await insertData('prayer_requests', {
        name,
        request,
        is_public: isPublic,
        created_at: new Date().toISOString(),
      });
      
      // Send email notification for non-public requests
      if (!isPublic) {
        const emailParams = {
          to_email: 'jordaneneal005@gmail.com',
          from_name: name,
          prayer_request: request,
          is_public: 'No',
          submitted_at: new Date().toLocaleString()
        };
        
        // Check if EmailJS is configured
        const emailjsConfigured = process.env.REACT_APP_EMAILJS_SERVICE_ID && 
                                 process.env.REACT_APP_EMAILJS_TEMPLATE_ID && 
                                 process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
        
        if (emailjsConfigured) {
          try {
            await emailjs.send(
              process.env.REACT_APP_EMAILJS_SERVICE_ID,
              process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
              emailParams,
              process.env.REACT_APP_EMAILJS_PUBLIC_KEY
            );
            console.log('Email sent successfully');
          } catch (emailError) {
            console.error('Email sending failed:', emailError);
            // Don't fail the entire submission if email fails
          }
        } else {
          console.warn('EmailJS not configured. Prayer request saved but email not sent.');
        }
      }
      
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

        {/* Public Prayer Requests Dropdown */}
        <div className="mb-6">
          <button
            type="button"
            onClick={togglePublicRequests}
            className="w-full bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-800 px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-between"
          >
            <span>View Public Prayer Requests</span>
            <span className={`transform transition-transform ${showPublicRequests ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          
          {showPublicRequests && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2 bg-white border border-gray-200 rounded-lg max-h-64 overflow-y-auto"
            >
              {loadingRequests ? (
                <div className="p-4 text-center text-gray-500">Loading prayer requests...</div>
              ) : publicRequests.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {publicRequests.map((req, index) => (
                    <div key={index} className="p-4">
                      <div className="text-sm text-gray-500 mb-1">
                        {new Date(req.created_at).toLocaleDateString()}
                      </div>
                      <p className="text-gray-800">{req.request}</p>
                      <div className="text-xs text-gray-400 mt-2">- {req.name || 'Anonymous'}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-gray-500">No public prayer requests yet.</div>
              )}
            </motion.div>
          )}
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
          
          <div className="space-y-2">
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
            <p className="text-xs text-gray-500 ml-6">
              Note: Private prayer requests will be sent to Raven for personal prayer.
            </p>
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