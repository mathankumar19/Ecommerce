import { CART_DATA } from "../constants/appConstants";

const initialState = {
  data: {
    items: []
  },
  fetching: false,
  fetched: false,
  error: null
};

function cartReducer(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  // const nextState = Object.assign({}, state);

  switch (action.type) {
    case CART_DATA.INITSTATE: {
      return initialState;
    }
    case CART_DATA.INIT: {
      return {
        ...state,
        fetching: true,
        fetched: false,
        error: false
      };
    }
    case CART_DATA.REJECTED: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: action.payload
      };
    }
    case CART_DATA.FULFILLED: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: false,
        data: action.payload
      };
    }
    case CART_DATA.ADD_TO_CART: {
      const { product, quantity } = action.payload;
      const existingItem = state.data.items.find(item => item.id === product.id);
      
      if (existingItem) {
        return {
          ...state,
          data: {
            ...state.data,
            items: state.data.items.map(item => 
              item.id === product.id 
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          }
        };
      } else {
        return {
          ...state,
          data: {
            ...state.data,
            items: [...state.data.items, { ...product, quantity }]
          }
        };
      }
    }
    case CART_DATA.REMOVE_FROM_CART: {
      return {
        ...state,
        data: {
          ...state.data,
          items: state.data.items.filter(item => item.id !== action.payload)
        }
      };
    }
    case CART_DATA.UPDATE_QUANTITY: {
      const { id, quantity } = action.payload;
      return {
        ...state,
        data: {
          ...state.data,
          items: state.data.items.map(item => 
            item.id === id ? { ...item, quantity } : item
          )
        }
      };
    }
    case CART_DATA.CLEAR_CART: {
      return {
        ...state,
        data: {
          ...state.data,
          items: []
        }
      };
    }
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}

export default cartReducer;