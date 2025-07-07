import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

function Carousel({ events }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (events && events.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [events]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + events.length) % events.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
  };

  const handleViewDetailsClick = (eventId) => {
    navigate(`/event/${eventId}?type=past`);
  };

  if (!events || events.length === 0) {
    return (
      <div className="bg-gray-100 p-8 rounded-xl shadow-inner text-center text-gray-500">
        No past events to display.
      </div>
    );
  }

  const cardSpacing = 180;
  const scaleFactor = 0.15;
  const opacityFactor = 0.2;
  const maxVisibleOffset = 2;

  return (
    <div className="relative w-full max-w-5xl mx-auto h-[400px] flex items-center justify-center py-8">
      {events.map((event, index) => {
        let offset = index - currentIndex;

        if (offset > events.length / 2) {
          offset -= events.length;
        } else if (offset < -events.length / 2) {
          offset += events.length;
        }

        let translateX = offset * cardSpacing;
        let scale = 1 - Math.abs(offset) * scaleFactor;
        let zIndex = 30 - Math.abs(offset);
        let opacity = 1 - Math.abs(offset) * opacityFactor;

        scale = Math.max(0.7, scale);
        opacity = Math.max(0.2, opacity);

        if (Math.abs(offset) > maxVisibleOffset) {
          opacity = 0;
          zIndex = 1;
        }

        if (offset === 0) {
          scale = 1;
          opacity = 1;
          zIndex = 30;
        }

        return (
          <div
            key={event.id || index}
            className="absolute transition-all duration-500 ease-in-out p-4 rounded-2xl shadow-xl flex flex-col items-center justify-start bg-white/90 backdrop-blur-md border border-slate-200"
            style={{
              transform: `translateX(${translateX}px) scale(${scale})`,
              zIndex: zIndex,
              opacity: opacity,
              width: offset === 0 ? '320px' : '280px',
              height: '350px',
              left: '50%',
              marginLeft: offset === 0 ? '-160px' : '-140px',
            }}
          >
            <img
              src={event.imageUrl || `https://placehold.co/300x120/007bff/ffffff?text=${event.name.replace(/\s/g, '+')}`}
              alt={event.name}
              className="w-full h-[140px] object-cover rounded-lg mb-3 shadow-sm"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://placehold.co/300x120/cccccc/333333?text=Image+Not+Found`;
              }}
            />
            <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">{event?.title}</h3>
            <p className="text-sm text-gray-600 mb-1 text-center line-clamp-2">{event?.description}</p>
            <p className="text-sm text-gray-500 mb-3">📍 {event?.location}</p>
            {offset === 0 && (
              <button
                onClick={() => handleViewDetailsClick(event.id)}
                className="mt-auto w-full p-2 bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-300 text-white rounded-full text-md font-semibold hover:opacity-90 transition-all shadow-lg"
              >
                View Details
              </button>
            )}
          </div>
        );
      })}

      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/70 p-3 rounded-full shadow-lg transition-colors z-40"
        aria-label="Previous slide"
      >
        <ChevronLeftIcon className="w-7 h-7 text-gray-800" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/70 p-3 rounded-full shadow-lg transition-colors z-40"
        aria-label="Next slide"
      >
        <ChevronRightIcon className="w-7 h-7 text-gray-800" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-40">
        {events.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? 'bg-cyan-500' : 'bg-gray-300 hover:bg-gray-400'
            } transition-colors`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
