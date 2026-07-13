import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { product } from '../actions/productActions';
import { addToCart } from '../actions/cartActions';
import '../styles/Products.css';

function Products() {
  const dispatch = useDispatch();

  // Get products state from Redux
  const { products, loading, error } = useSelector(state => state.products);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [selectedRating, setSelectedRating] = useState(0);
  const [sortBy, setSortBy] = useState('default');
  const [showFilters, setShowFilters] = useState(true);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  useEffect(() => {
    dispatch(product());
  }, [dispatch]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, priceRange, selectedRating, sortBy]);

  // Filter and sort products
  const getFilteredProducts = () => {
    if (!products || products.length === 0) return [];

    let filtered = [...products];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Price range filter
    filtered = filtered.filter(product =>
      product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Rating filter
    if (selectedRating > 0) {
      filtered = filtered.filter(product => product.rating >= selectedRating);
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Pagination handlers
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setPriceRange({ min: 0, max: 10000 });
    setSelectedRating(0);
    setSortBy('default');
    setCurrentPage(1);
  };

  const handleAddToCart = (e, productData) => {
    e.preventDefault();
    dispatch(addToCart(productData, 1));
  };

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="products-page">
      <div className="products-container">
        <div className="products-header">
          <h1>All Products</h1>
          <div className="header-actions">
            <p className="product-count">
              Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} Premium Products
            </p>
            <button
              className="filter-toggle-btn"
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? '✕ Close Filters' : '🔍 Filter & Sort'}
            </button>
          </div>
        </div>

        {/* Collapsible Filters Section */}
        <div className={`filters-dropdown ${showFilters ? 'show' : ''}`}>
          <div className="filters-grid">
            <div className="filter-group">
              <label>Search</label>
              <input
                type="text"
                placeholder="Product name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-group">
              <label>Price Range</label>
              <div className="price-inputs">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                />
                <span>-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                />
              </div>
            </div>
            <div className="filter-group">
              <label>Min Rating</label>
              <select
                value={selectedRating}
                onChange={(e) => setSelectedRating(Number(e.target.value))}
              >
                {[0, 1, 2, 3, 4, 5].map(r => (
                  <option key={r} value={r}>{r === 0 ? 'All Ratings' : `${r}+ Stars`}</option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label>Sort By</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="default">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>
          <button className="reset-all-btn" onClick={resetFilters}>Reset All Filters</button>
        </div>

        <div className="products-grid">
          {currentProducts && currentProducts.length > 0 ? (
            currentProducts.map(product => (
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
            ))
          ) : (
            <div className="no-products">
              <div className="no-products-icon">📦</div>
              <h2>No products found</h2>
              <p>Try adjusting your filters or search terms.</p>
              <button onClick={resetFilters} className="clear-btn">Clear All Filters</button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredProducts.length > 0 && totalPages > 1 && (
          <div className="pagination">
            <button
              className="pagination-btn"
              onClick={goToPrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            <div className="pagination-numbers">
              {getPageNumbers().map((pageNum, index) => (
                pageNum === '...' ? (
                  <span key={`ellipsis-${index}`} className="pagination-ellipsis">...</span>
                ) : (
                  <button
                    key={pageNum}
                    className={`pagination-number ${currentPage === pageNum ? 'active' : ''}`}
                    onClick={() => goToPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                )
              ))}
            </div>

            <button
              className="pagination-btn"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
