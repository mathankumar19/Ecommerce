import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDepartment } from '../actions/departmentActions';
import RotatingSlider from '../components/Slider/RotatingSlider';
import TrendingSlider from '../components/Slider/TrendingSlider';
import '../styles/Home.css';

function Home() {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector(state => state.department);
  
  // Fetch baby department data when component mounts
  useEffect(() => {
    dispatch(fetchDepartment('baby'));
  }, [dispatch]);

  // Placeholder data for the slider (used as fallback if API data is not available)
  const placeholderBanners = [
    { id: 1, imageUrl: 'https://via.placeholder.com/1200x400?text=Featured+Banner+1' },
    { id: 2, imageUrl: 'https://via.placeholder.com/1200x400?text=Featured+Banner+2' },
    { id: 3, imageUrl: 'https://via.placeholder.com/1200x400?text=Featured+Banner+3' },
  ];

  // Placeholder data for trending products (used as fallback if API data is not available)
  const placeholderProducts = [
    { id: 1, title: 'Product 1', price: '$99.99', imageUrl: 'https://via.placeholder.com/300x300?text=Product+1' },
    { id: 2, title: 'Product 2', price: '$149.99', imageUrl: 'https://via.placeholder.com/300x300?text=Product+2' },
    { id: 3, title: 'Product 3', price: '$199.99', imageUrl: 'https://via.placeholder.com/300x300?text=Product+3' },
    { id: 4, title: 'Product 4', price: '$129.99', imageUrl: 'https://via.placeholder.com/300x300?text=Product+4' },
    { id: 5, title: 'Product 5', price: '$79.99', imageUrl: 'https://via.placeholder.com/300x300?text=Product+5' },
    { id: 6, title: 'Product 6', price: '$249.99', imageUrl: 'https://via.placeholder.com/300x300?text=Product+6' },
  ];

  return (
    <div className="home">
      {/* Baby Department Content */}
      {loading ? (
        <div className="loading">Loading baby department data...</div>
      ) : error ? (
        <div className="error">Error loading baby department data: {error}</div>
      ) : data ? (
        <div className="baby-department-content">
          {/* Baby Department Rotating Banner Slider */}
          <RotatingSlider data={data} />
          
          {/* Baby Department Trending Products */}
          <TrendingSlider data={data} />
        </div>
      ) : (
        <>
          {/* Fallback to placeholder content if no data is available */}
          <div className="featured-banners">
            <div className="banner-slider">
              {placeholderBanners.map(banner => (
                <div key={banner.id} className="banner-slide">
                  <img src={banner.imageUrl} alt={`Banner ${banner.id}`} />
                </div>
              ))}
            </div>
          </div>

          <div className="trending-products">
            <h2 className="trending-section-title">Trending Products</h2>
            <div className="products-grid">
              {placeholderProducts.map(product => (
                <div key={product.id} className="product-card">
                  <div className="product-image">
                    <img src={product.imageUrl} alt={product.title} />
                  </div>
                  <div className="product-info">
                    <h3>{product.title}</h3>
                    <p className="product-price">{product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;