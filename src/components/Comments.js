import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Comments = ({ prayerId, initialComments = [] }) => {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');
  const [commenterName, setCommenterName] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const comment = {
        id: Date.now(),
        name: commenterName.trim() || 'Anonymous',
        text: newComment.trim(),
        date: 'Just now',
        timestamp: new Date().toISOString()
      };
      
      setComments(prev => [comment, ...prev]);
      setNewComment('');
      setCommenterName('');
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="mt-4 border-t pt-4">
      {/* Comments Toggle Button */}
      <button
        onClick={() => setShowComments(!showComments)}
        className="flex items-center text-sm text-gray-600 hover:text-gray-800 mb-3"
      >
        <span className="mr-2">💬</span>
        {showComments ? 'Hide Comments' : `View Comments (${comments.length})`}
      </button>

      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {/* Add Comment Form */}
            <form onSubmit={handleSubmitComment} className="bg-gray-50 p-4 rounded-lg">
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Your name (optional)"
                  value={commenterName}
                  onChange={(e) => setCommenterName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent text-sm"
                  maxLength={50}
                />
              </div>
              <div className="mb-3">
                <textarea
                  placeholder="Leave a comment of encouragement or support..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent text-sm resize-none"
                  rows={3}
                  maxLength={500}
                  required
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  {500 - newComment.length} characters remaining
                </span>
                <button
                  type="submit"
                  disabled={isSubmitting || !newComment.trim()}
                  className="px-4 py-2 bg-orange text-white rounded-md hover:bg-orange/90 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition-colors"
                >
                  {isSubmitting ? 'Posting...' : 'Post Comment'}
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {comments.length === 0 ? (
                <p className="text-gray-500 text-sm italic text-center py-4">
                  No comments yet. Be the first to leave encouragement!
                </p>
              ) : (
                comments.map((comment) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-3 rounded-lg border border-gray-200"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-gray-800 text-sm">
                        {comment.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {comment.date}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {comment.text}
                    </p>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Comments;