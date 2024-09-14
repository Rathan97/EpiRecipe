// src/pages/RecipePage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/RecipePage.css';

function RecipePage() {
  const { title } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get('http://localhost:5000/search/title/', {
          params: { title }
        });
        setRecipe(response.data.results[0]); // Assuming results is an array
      } catch (error) {
        console.error('Error fetching recipe details:', error);
      }
    };

    fetchRecipe();
  }, [title]);

  if (!recipe) return <div>Loading...</div>;

  return (
    <div className="recipe-page">
      <h1>{recipe.title}</h1>
      <div className="recipe-details">
        <p><strong>Rating:</strong> {recipe.rating || 'Not Specified'}</p>
        <p><strong>Calories:</strong> {recipe.calories || 'Not Specified'}</p>
        <p><strong>Protein:</strong> {recipe.protein || 'Not Specified'}</p>
        <p><strong>Fat:</strong> {recipe.fat || 'Not Specified'}</p>
        <p><strong>Sodium:</strong> {recipe.sodium || 'Not Specified'}</p>
        <p><strong>Categories:</strong> {recipe.categories.join(', ')}</p>
        <p><strong>Description:</strong> {recipe.desc || 'No Description'}</p>
      </div>
      <div className="directions">
        <h2 className="directions-title">Directions</h2>
        <ul>
          {recipe.directions.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>
      </div>
      <div className="ingredients">
        <h2 className="ingredients-title">Ingredients</h2>
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RecipePage;
