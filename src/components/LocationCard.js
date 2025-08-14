import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaCalendarAlt, FaClock } from 'react-icons/fa';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card';

const LocationCard = ({ location }) => {
  const { name, address, date, time, description, isUpcoming } = location;
  
  // Calculate days remaining if it's an upcoming event
  const daysRemaining = isUpcoming ? Math.ceil((new Date(date) - new Date()) / (1000 * 60 * 60 * 24)) : null;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-white overflow-hidden">
        {/* Event Status Banner */}
        {isUpcoming ? (
          <div className="bg-orange text-white py-2 px-4 text-center font-bold">
            Upcoming Event - {daysRemaining} {daysRemaining === 1 ? 'day' : 'days'} remaining
          </div>
        ) : (
          <div className="bg-gray-500 text-white py-2 px-4 text-center font-bold">
            Previous Event
          </div>
        )}

        <CardHeader>
          <CardTitle className="text-xl text-gray-900">{name}</CardTitle>
          <CardDescription className="text-gray-600">{description}</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-3 mb-4">
            <div className="flex items-start space-x-2">
              <FaMapMarkerAlt className="text-coral mt-1 flex-shrink-0" />
              <p className="text-gray-700">{address}</p>
            </div>
            
            <div className="flex items-start space-x-2">
              <FaCalendarAlt className="text-coral mt-1 flex-shrink-0" />
              <p className="text-gray-700">{date}</p>
            </div>
            
            <div className="flex items-start space-x-2">
              <FaClock className="text-coral mt-1 flex-shrink-0" />
              <p className="text-gray-700">{time}</p>
            </div>
          </div>
        
          {isUpcoming && (
            <div className="mt-4">
              <h4 className="font-semibold text-gray-900 mb-2">Countdown</h4>
              <div className="bg-gray-100 rounded-lg p-4">
                <div className="grid grid-cols-4 gap-2 text-center">
                  <CountdownItem value={Math.floor(daysRemaining)} label="Days" />
                  <CountdownItem value={Math.floor((daysRemaining % 1) * 24)} label="Hours" />
                  <CountdownItem value={Math.floor(((daysRemaining % 1) * 24 % 1) * 60)} label="Minutes" />
                  <CountdownItem value={Math.floor(((daysRemaining % 1) * 24 % 1 * 60 % 1) * 60)} label="Seconds" />
                </div>
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter>
          <div className="flex space-x-3 w-full">
            {isUpcoming ? (
              <>
                <motion.button
                  className="bg-lemonYellow hover:bg-lemonYellow/90 text-gray-900 px-4 py-2 rounded-md font-medium transition-colors flex-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Directions
                </motion.button>
                
                <motion.button
                  className="bg-white border-2 border-orange text-orange hover:bg-orange/10 px-4 py-2 rounded-md font-medium transition-colors flex-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Add to Calendar
                </motion.button>
              </>
            ) : (
              <motion.button
                className="bg-gray-300 text-gray-600 px-4 py-2 rounded-md font-medium transition-colors flex-1 cursor-default"
                disabled
              >
                Event Completed
              </motion.button>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const CountdownItem = ({ value, label }) => (
  <div>
    <div className="bg-white rounded-md p-2 shadow-sm">
      <span className="text-2xl font-bold text-orange">{value}</span>
    </div>
    <span className="text-xs text-gray-600">{label}</span>
  </div>
);

export default LocationCard;