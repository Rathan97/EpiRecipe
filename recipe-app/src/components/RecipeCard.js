// src/components/RecipeCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import '../styles/RecipeCard.css';

function RecipeCard({ recipe }) {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const totalStars = 5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FontAwesomeIcon key={i} icon={faStar} className="star-icon filled-star" />);
    }

    if (hasHalfStar) {
      stars.push(<FontAwesomeIcon key="half-star" icon={faStarHalfAlt} className="star-icon filled-star" />);
    }

    for (let i = stars.length; i < totalStars; i++) {
      stars.push(<FontAwesomeIcon key={i + 'empty'} icon={faStar} className="star-icon empty-star" />);
    }

    return stars;
  };

  return (
    <div className="recipe-card">
      <Link to={`/recipe/${encodeURIComponent(recipe.title)}`}>
        <h2>{recipe.title}</h2>
        <p><strong>Categories:</strong> {recipe.categories.join(', ')}</p>
        <p><strong>Rating:</strong> {renderStars(recipe.rating || 0)} {recipe.rating || 'No Rating'}</p>
        <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
      </Link>
    </div>
  );
}

export default RecipeCard;
