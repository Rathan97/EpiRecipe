// src/components/RecipeDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // Fetch recipe details by ID
    fetch(`/api/recipes/${id}`)
      .then(response => response.json())
      .then(data => setRecipe(data));
  }, [id]);

  if (!recipe) return <div>Loading...</div>;

  return (
    <div className="recipe-detail">
      <h1>{recipe.title}</h1>
      <p>Rating: {recipe.rating}</p>
      <p>Calories: {recipe.calories}</p>
      <p>Protein: {recipe.protein}</p>
      <p>Fat: {recipe.fat}</p>
      <p>Sodium: {recipe.sodium}</p>
      <p>Categories: {recipe.categories.join(', ')}</p>
      {/* Display similar recipes below */}
    </div>
  );
}

export default RecipeDetail;
