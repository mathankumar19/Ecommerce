import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { fetchSearchProducts } from '../actions/productActions';
import { addToCart } from '../actions/cartActions';
import '../styles/Search.css';

function SearchResults() {
    const dispatch = useDispatch();
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('q');

    const { products, fetching, error } = useSelector(state => state.products);

    useEffect(() => {
        if (query) {
            dispatch(fetchSearchProducts(query));
        }
    }, [dispatch, query]);

    const handleAddToCart = (e, productData) => {
        e.preventDefault();
        dispatch(addToCart(productData, 1));
    };

    if (fetching) return <div className="search-loading">Searching for "{query}"...</div>;
    if (error) return <div className="search-error">Error: {error}</div>;

    return (
        <div className="search-page">
            <div className="search-container">
                <header className="search-header">
                    <h1>Search Results for "{query}"</h1>
                    <p>{products?.length || 0} products found</p>
                </header>

                {products && products.length > 0 ? (
                    <div className="product-grid">
                        {products.map(product => (
                            <div key={product.id} className="product-card">
                                <Link to={`/products/${product.id}`} className="card-link">
                                    <div className="search-product-image">
                                        <img src={product.thumbnail} alt={product.title} />
                                    </div>
                                    <div className="product-details">
                                        <span className="product-brand">{product.brand}</span>
                                        <h3 className="product-title">{product.title}</h3>
                                        <div className="product-pricing">
                                            <span className="price">${product.price}</span>
                                            <div className="rating">
                                                <span className="star">★</span> {product.rating}
                                            </div>
                                        </div>
                                        <div className="card-actions">
                                            <button className="view-btn">View Detail</button>
                                            <button
                                                className="add-to-basket"
                                                onClick={(e) => handleAddToCart(e, product)}
                                            >
                                                Add to Basket
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="no-results">
                        <div className="no-results-icon">🔍</div>
                        <h2>No results found</h2>
                        <p>We couldn't find any products matching your search. Try different keywords.</p>
                        <Link to="/products" className="back-btn">Browse All Products</Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchResults;
