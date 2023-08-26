import React from 'react';
import { useNavigate } from 'react-router-dom'

function Abstract() {
  const navigate = useNavigate();

  const navigateToYourFood = () => {
    navigate('/yourfood');
  };

  return (
    <div className='section'>
      <h1 className='title'>The Essence of Us</h1>
      <p className='info'>Introducing Food for Thought, a personalized meal recommendation system that tailors delightful culinary suggestions to your unique taste preferences. Whether you prefer vegetarian or non-vegetarian options, starters, mains, or desserts, it curates a tantalizing selection of dishes. Discover nearby restaurants that perfectly complement your gastronomic indulgence. Experience the fusion of gastronomy and technology, elevating your dining to unparalleled heights.</p>
      <button onClick={navigateToYourFood} className='btn'>Explore now</button>
    </div>
  )
}

export default Abstract