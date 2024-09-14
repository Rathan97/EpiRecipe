import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import RecipePage from './pages/RecipePage';
import './App.css';

function App() {
    const [searchQuery, setSearchQuery] = React.useState('');

    return (

      
        <Router>
      
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/recipe/:title" element={<RecipePage />} />
                
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
