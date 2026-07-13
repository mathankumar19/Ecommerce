import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../actions/categoryActions';
import '../styles/Categories.css';

// Mapping categories to icons/emojis for better visual representation
const categoryIcons = {
    'beauty': '💄',
    'fragrances': '✨',
    'furniture': '🛋️',
    'groceries': '🛒',
    'home-decoration': '🖼️',
    'kitchen-accessories': '🍳',
    'laptops': '💻',
    'mens-shirts': '👕',
    'mens-shoes': '👟',
    'mens-watches': '⌚',
    'mobile-accessories': '🔌',
    'motorcycle': '🏍️',
    'skin-care': '🧴',
    'smartphones': '📱',
    'sports-accessories': '🏐',
    'sunglasses': '🕶️',
    'tablets': '平板',
    'tops': '👚',
    'vehicle': '🚗',
    'womens-bags': '👜',
    'womens-dresses': '👗',
    'womens-jewellery': '💍',
    'womens-shoes': '👠',
    'womens-watches': '⌚'
};

function Categories() {
    const dispatch = useDispatch();
    const { categories, loading, error } = useSelector(state => state.categories);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const filteredCategories = categories.filter(category => {
        const name = (category.name || category).toLowerCase();
        return name.includes(searchTerm.toLowerCase());
    });

    if (loading) return (
        <div className="categories-loading">
            <div className="spinner"></div>
            <p>Gathering categories...</p>
        </div>
    );

    if (error) return <div className="error-container">Error: {error}</div>;

    return (
        <div className="categories-page">
            <div className="categories-hero">
                <div className="hero-content">
                    <h1>Explore Our Collections</h1>
                    <p>Find everything you need across our diverse categories</p>
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Search categories..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <span className="search-icon">🔍</span>
                    </div>
                </div>
            </div>

            <div className="categories-container">
                <div className="categories-grid">
                    {filteredCategories.map((category) => {
                        const slug = category.slug || category;
                        const name = category.name || category.replace(/-/g, ' ');
                        const icon = categoryIcons[slug] || '📦';

                        return (
                            <Link
                                to={`/category/${slug}`}
                                key={slug}
                                className="category-card"
                            >
                                <div className="category-icon-wrapper">
                                    <span className="category-emoji">{icon}</span>
                                </div>
                                <div className="category-info">
                                    <h3>{name}</h3>
                                    <div className="card-footer">
                                        <span className="explore-text">Browse Products</span>
                                        <span className="arrow">→</span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
                {filteredCategories.length === 0 && (
                    <div className="no-results">
                        <p>No categories found matching "{searchTerm}"</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Categories;
