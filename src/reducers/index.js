import { combineReducers } from 'redux';
import productsReducer from './productsReducer';
import cartReducer from './cartReducer';
import userReducer from './userReducer';
import departmentReducer from './departmentReducer';
import orderReducer from './orderReducer';
import categoryReducer from './categoryReducer';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  user: userReducer,
  department: departmentReducer,
  orders: orderReducer,
  categories: categoryReducer
});

export default rootReducer;