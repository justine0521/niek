import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import Shoe1 from '../images/Shoes/shoes1.png';
import Shoe2 from '../images/Shoes/shoes2.jpg';
import Shoe3 from '../images/Shoes/shoes3.png';
import Shoe4 from '../images/Shoes/shoes4.png';
import Shoe5 from '../images/Shoes/shoes5.png';

const shoeImages = [Shoe1, Shoe2, Shoe3, Shoe4, Shoe5];

function Popular() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handlePrevious = () => {
    const newIndex = (currentIndex - 1 + shoeImages.length) % shoeImages.length;
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % shoeImages.length;
    setCurrentIndex(newIndex);
  };

  return (
    <section className="py-12 ">
      <div className="container mx-auto">
        <h3 className="text-2xl font-bold text-center mb-8">Popular Shoes</h3>
        <div className="relative flex items-center justify-center">
          <button
            onClick={handlePrevious}
            className="absolute left-0 p-3 bg-orange-400 text-white rounded-full hover:bg-gray-700 transition duration-300"
          >
            <FaArrowLeft />
          </button>
          <div className="w-full max-w-lg mx-10 overflow-hidden rounded-lg shadow-lg">
            <img
              src={shoeImages[currentIndex]}
              alt="Popular Shoes"
              className="w-full h-64 transition duration-500 transform hover:scale-105"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <button
            onClick={handleNext}
            className="absolute right-0 p-3 bg-orange-400 text-white rounded-full hover:bg-gray-700 transition duration-300"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Popular;
