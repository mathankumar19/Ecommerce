import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetail } from '../actions/productActions';
import { addToCart } from '../actions/cartActions';
import '../styles/ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState('');

  // Get product detail from Redux store
  const { selectedProduct, loading, error } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProductDetail(id));
  }, [dispatch, id]);

  // Set initial selected image when product loads
  useEffect(() => {
    if (selectedProduct) {
      setSelectedImage(selectedProduct.images && selectedProduct.images.length > 0
        ? selectedProduct.images[0]
        : selectedProduct.thumbnail);
    }
  }, [selectedProduct]);

  // Handle adding to cart
  const handleAddToCart = () => {
    if (selectedProduct) {
      dispatch(addToCart(selectedProduct, quantity));
      navigate('/cart');
    }
  };

  // Handle quantity change
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  if (loading) {
    return <div className="loading">Loading product details...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!selectedProduct) {
    return <div className="loading">Product not found</div>;
  }

  const productImages = selectedProduct.images && selectedProduct.images.length > 0
    ? selectedProduct.images
    : [selectedProduct.thumbnail];

  // Add more placeholder images if only one image is available
  const images = productImages.length <= 1
    ? [
      productImages[0] || selectedProduct.thumbnail,
      'https://placehold.co/600x600?text=Front+View',
      'https://placehold.co/600x600?text=Side+View',
      'https://placehold.co/600x600?text=Packaging'
    ]
    : productImages;

  return (
    <div className="product-detail-container">
      <div className="product-detail">
        <div className="product-images-section">
          <div className="thumbnail-gallery">
            {images.map((img, index) => (
              <div
                key={index}
                className={`thumbnail-item ${selectedImage === img ? 'active' : ''}`}
                onClick={() => setSelectedImage(img)}
              >
                <img src={img} alt={`${selectedProduct.title} ${index + 1}`} />
              </div>
            ))}
          </div>
          <div className="detail-product-image">
            <img
              src={selectedImage}
              alt={selectedProduct.title}
            />
          </div>
        </div>

        <div className="product-info">
          <span className="brand-tag">{selectedProduct.brand}</span>
          <h1>{selectedProduct.title}</h1>
          <div className="rating-row">
            <span className="stars">★ ★ ★ ★ ☆</span>
            <span className="rating-value">{selectedProduct.rating} / 5</span>
          </div>
          <p className="price">${selectedProduct.price}</p>
          <div className="stock-info">
            <span className={`status ${selectedProduct.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
              {selectedProduct.stock > 0 ? '● In Stock' : '○ Out of Stock'}
            </span>
          </div>
          <p className="description">{selectedProduct.description}</p>

          <div className="purchase-actions">
            <div className="quantity-selector">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="qty-btn"
              >-</button>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="qty-btn"
              >+</button>
            </div>

            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>

          <div className="product-meta">
            <p><strong>Category:</strong> {selectedProduct.category}</p>
            <p><strong>SKU:</strong> {selectedProduct.sku || 'N/A'}</p>
          </div>

          <Link to="/products" className="back-link">← Back to Products</Link>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;