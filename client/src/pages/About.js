import React from 'react';
import Navbar from '../components/Navbar';
import Currentlocation from '../components/Currentlocation'


function About() {
  return (
    <div className="bg-gray-100 foodBackground">
      <nav className="bg-gray-800 text-white pb-1">
        <Navbar />
      </nav>
      <div className="container mx-auto p-8 ">
        <div className='aboutDiv'>
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <p className="text-gray-700 mb-6">
            In FoodForThought, we are passionate about helping you find the perfect food that suits your preferences and discovering nearby restaurants that offer the dishes (foods) you love. Our platform is designed to simplify the process of finding delicious food options, whether you're a vegetarian or a non-vegetarian, and selecting Cuisine type, and to connect you with restaurants in your vicinity.
          </p>

          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-6">
            Our mission is to provide a seamless and personalized food discovery experience for our users. We believe that everyone deserves to enjoy a satisfying meal, tailored to their dietary preferences and taste buds. We strive to offer a user-friendly interface and a comprehensive database of food options to ensure that you can find exactly what you're looking for.
          </p>

          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <ol className="list-decimal list-inside mb-6">
            <li className="text-gray-700 mb-2">Select Your Dietary Preference: Choose between vegetarian or non-vegetarian options to narrow down your food selection.</li>
            <li className="text-gray-700 mb-2">Explore Cuisine Types: Browse through a diverse range of cuisine types, including Italian, Mexican, Asian, Indian, and more, to find the cuisine that satisfies your cravings.</li>
            <li className="text-gray-700 mb-2">Refine Based on Ratings: Filter your food options based on user ratings to discover highly-rated dishes that others have enjoyed.</li>
            <li className="text-gray-700 mb-2">Discover Available Food Options: Explore a curated list of available food options that match your preferences, featuring detailed descriptions to help you make an informed choice.</li>
            <li className="text-gray-700 mb-2">Find Similar Foods: Once you've selected a specific dish, our platform goes the extra mile to recommend similar foods that you might also enjoy. This way, you can explore a wider range of dishes that align with your preferences and expand your culinary horizons.</li>
            <li className="text-gray-700 mb-2">Find Nearby Restaurants: Our platform not only helps you discover the perfect food but also provides you with the locations of nearby restaurants that offer your selected food. With the convenience of knowing where to go, you can enjoy your favorite dish in a restaurant that suits your taste and preferences.</li>
          </ol>

          <p className="text-gray-700">
            We are dedicated to continually improving our platform, expanding our food database, and providing you with a seamless and enjoyable food exploration journey.
          </p>
        </div>
      </div>
    </div>

  );
};
export default About