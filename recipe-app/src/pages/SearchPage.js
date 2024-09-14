import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard';
import Header from '../components/Header';
import '../styles/SearchPage.css'; 

function SearchPage() {
    const [recipes, setRecipes] = useState([]);
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('');
    const [protein, setProtein] = useState(0);
    const [fat, setFat] = useState(0);
    const [sodium, setSodium] = useState(0);
    const [rating, setRating] = useState(0);

    useEffect(() => {
        const fetchRecipes = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const searchQuery = urlParams.get('query') || '';
            setQuery(searchQuery); // Update query state

            if (searchQuery) {
                try {
                    const response = await axios.get('http://localhost:5000/search/title/', {
                        params: { title: searchQuery }
                    });
                    setRecipes(response.data.results);
                } catch (error) {
                    console.error('Error fetching recipes:', error);
                }
            } else {
                // Fetch all recipes if no search query
                try {
                    const response = await axios.get('http://localhost:5000/search/recipes/');
                    setRecipes(response.data.results);
                } catch (error) {
                    console.error('Error fetching recipes:', error);
                }
            }
        };

        fetchRecipes();
    }, [window.location.search]); // Depend on URL search to refetch when it changes

    const handleFilterSubmit = async () => {
        try {
            const response = await axios.get('http://localhost:5000/filter/recipes/', {
                params: {
                    category: category || undefined,
                    protein: protein || undefined,
                    fat: fat || undefined,
                    sodium: sodium || undefined,
                    rating: rating || undefined
                }
            });
            setRecipes(response.data.results);
        } catch (error) {
            console.error('Error applying filters:', error);
        }
    };

    return (
        <div className="search-page">
            <Header setSearchQuery={(query) => setQuery(query)} /> {/* Pass a function to update the query */}
            <div className="content">
                <div className="filter-sidebar">
                    <h3>Filters</h3>
                    
                    {/* Category Filter */}
                    <div>
                        <label>Category:</label>
                        <input
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            placeholder="Enter category"
                        />
                    </div>

                    {/* Protein Filter */}
                    <div>
                        <label>Protein:</label>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={protein}
                            onChange={(e) => setProtein(e.target.value)}
                        />
                        <span>{protein}g</span>
                    </div>

                    {/* Fat Filter */}
                    <div>
                        <label>Fat:</label>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={fat}
                            onChange={(e) => setFat(e.target.value)}
                        />
                        <span>{fat}g</span>
                    </div>

                    {/* Sodium Filter */}
                    <div>
                        <label>Sodium:</label>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={sodium}
                            onChange={(e) => setSodium(e.target.value)}
                        />
                        <span>{sodium}mg</span>
                    </div>

                    {/* Rating Filter */}
                    <div>
                        <label>Rating:</label>
                        <input
                            type="range"
                            min="0"
                            max="5"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                        />
                        <span>{rating} stars</span>
                    </div>

                    <button onClick={handleFilterSubmit}>Apply Filters</button>
                </div>

                <div className="results-section">
                    <h3>Results</h3>
                    <div className="recipe-grid">
                        {recipes.length > 0 ? (
                            recipes.map((recipe) => (
                                <RecipeCard key={recipe.id} recipe={recipe} />
                            ))
                        ) : (
                            <p>No recipes found</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchPage;
