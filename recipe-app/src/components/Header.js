import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css'; // Import your CSS file

function Header({ setSearchQuery }) {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        setSearchQuery(searchTerm); // Update search query in HomePage
        navigate(`/search/?query=${searchTerm}`); // Navigate to search results page
    };

    return (
        <header className="header">
            <div className="header-left">
                <h1 className="logo" onClick={() => navigate('/')}>EpiRecipes</h1>
            </div>
            <div className="header-center">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search recipes..."
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="header-right">
                <button onClick={() => navigate('/')}>Home</button>
            </div>
        </header>
    );
}

export default Header;
