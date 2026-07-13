import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useDispatch } from 'react-redux';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ThankYou from './pages/ThankYou';
import OrderHistory from './pages/OrderHistory';
import OrderDetail from './pages/OrderDetail';
import Categories from './pages/Categories';
import CategoryProducts from './pages/CategoryProducts';
import SearchResults from './pages/Search';
import Department from './pages/Department';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MyAccount from './pages/MyAccount';
import { user } from './actions/userActions';
import './App.css';

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#e91e63',
    },
    secondary: {
      main: '#c2185b',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

function App() {
  const dispatch = useDispatch();

  // Check if user is already logged in when app loads
  useEffect(() => {
    dispatch(user());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon */}
      <CssBaseline />
      <Router>
        <div className="App">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/thank-you" element={<ThankYou />} />
              <Route path="/orders" element={<OrderHistory />} />
              <Route path="/orders/:orderId" element={<OrderDetail />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/category/:categoryName" element={<CategoryProducts />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/department/:deptName" element={<Department />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/account" element={<MyAccount />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
