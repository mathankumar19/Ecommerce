import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';
import { fetchCategories } from '../actions/categoryActions';
import '../styles/Header.css';

function Header() {
  const { isAuthenticated, currentUser } = useSelector(state => state.user);
  const { categories } = useSelector(state => state.categories);
  const { data: cartData } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const cartItems = cartData?.items || [];
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setUserDropdownOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Check if the current path is a category path
  const isCategoryActive = () => {
    return location.pathname.includes('/category') || location.pathname.includes('/categories');
  };

  // Check if the current path is a department path (excluding new arrivals)
  const isDepartmentActive = () => {
    return location.pathname.includes('/department') && !location.pathname.includes('/department/newarrivals');
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-top">
          <div className="logo">
            <Link to="/">
              <span className="logo-icon">🛒</span>
              <span className="logo-text">E-BABY</span>
            </Link>
          </div>

          <div className="header-search">
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="search-submit">
                <span className="icon">🔍</span>
              </button>
            </form>
          </div>

          <nav className={`nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <ul>
              <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
              <li><Link to="/products" className={location.pathname === '/products' ? 'active' : ''}>Products</Link></li>
              <li className={`dropdown ${isCategoryActive() ? 'active-parent' : ''}`}>
                <Link to="/categories" className="dropdown-title">Categories</Link>
                <div className="dropdown-content">
                  {categories.slice(0, 10).map((category) => (
                    <Link
                      key={category.slug || category}
                      to={`/category/${category.slug || category}`}
                      className={location.pathname === `/category/${category.slug || category}` ? 'active' : ''}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {category.name || category.replace(/-/g, ' ')}
                    </Link>
                  ))}
                  {categories.length > 10 && (
                    <Link to="/categories" className="view-all-link" onClick={() => setMobileMenuOpen(false)}>View All Categories</Link>
                  )}
                </div>
              </li>
              <li className={`dropdown ${isDepartmentActive() ? 'active-parent' : ''}`}>
                <span className="dropdown-title">Departments</span>
                <div className="dropdown-content">
                  <Link to="/department/baby" className={location.pathname === '/department/baby' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>Baby</Link>
                  <Link to="/department/furniture" className={location.pathname === '/department/furniture' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>Furniture</Link>
                  <Link to="/department/household" className={location.pathname === '/department/household' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>Household</Link>
                  <Link to="/department/babyandkids" className={location.pathname === '/department/babyandkids' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>Baby & Kids</Link>
                </div>
              </li>
              <li><Link to="/department/newarrivals" className={location.pathname === '/department/newarrivals' ? 'active' : ''}>New Arrivals</Link></li>
            </ul>
          </nav>

          <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            <span className="menu-icon">{mobileMenuOpen ? '✕' : '☰'}</span>
          </div>

          <div className="user-actions">
            {isAuthenticated ? (
              <div className="user-info">
                <div className="user-dropdown">
                  <div
                    className="welcome-text dropdown-toggle"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  >
                    Hi, {currentUser?.name || 'User'} <span className="dropdown-arrow">▼</span>
                  </div>
                  {userDropdownOpen && (
                    <div className="user-dropdown-content">
                      <Link to="/account" className="account-link" onClick={() => setUserDropdownOpen(false)}>
                        <span className="icon">👤</span> My Account
                      </Link>
                      <Link to="/orders" className="account-link" onClick={() => setUserDropdownOpen(false)}>
                        <span className="icon">📦</span> My Orders
                      </Link>
                      <button onClick={handleLogout} className="logout-button">
                        <span className="icon">🚪</span> Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <Link to="/login" className="login-button">
                <span className="icon">🔑</span> Login / Sign Up
              </Link>
            )}
            <div className="cart-icon">
              <Link to="/cart">
                <span className="icon">🛒</span> Cart ({cartCount})
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;