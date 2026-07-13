import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchCategoryProducts } from '../actions/categoryActions';
import { addToCart } from '../actions/cartActions';
import '../styles/CategoryProducts.css';

function CategoryProducts() {
    const { categoryName } = useParams();
    const dispatch = useDispatch();
    const { categoryProducts, loading, error } = useSelector(state => state.categories);

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(fetchCategoryProducts(categoryName));
    }, [dispatch, categoryName]);

    const handleAddToCart = (e, productData) => {
        e.preventDefault();
        dispatch(addToCart(productData, 1));
    };

    if (loading) return (
        <div className="category-loading">
            <div className="spinner"></div>
            <p>Loading {categoryName.replace(/-/g, ' ')}...</p>
        </div>
    );

    if (error) return <div className="error-container">Error: {error}</div>;

    const displayName = categoryName.replace(/-/g, ' ');

    return (
        <div className="category-products-page">
            <div className="category-products-container">
                <div className="category-header">
                    <Link to="/categories" className="back-link">← All Categories</Link>
                    <h1>{displayName}</h1>
                    <p className="product-count">{categoryProducts.length} Premium Products Found</p>
                </div>

                <div className="products-grid">
                    {categoryProducts.map((product) => (
                        <div key={product.id} className="product-card-wrapper">
                            <Link to={`/products/${product.id}`} className="product-card">
                                <div className="product-image-container">
                                    <img src={product.thumbnail} alt={product.title} />
                                    {product.discountPercentage > 15 && (
                                        <span className="discount-badge">-{Math.round(product.discountPercentage)}%</span>
                                    )}
                                </div>
                                <div className="product-details">
                                    <span className="brand">{product.brand}</span>
                                    <h3 className="title">{product.title}</h3>
                                    <div className="price-row">
                                        <span className="price">${product.price}</span>
                                        <div className="rating">
                                            <span className="star">★</span>
                                            <span>{product.rating}</span>
                                        </div>
                                    </div>
                                    <div className="card-actions">
                                        <button className="view-button">View Detail</button>
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
            </div>
        </div>
    );
}

export default CategoryProducts;
