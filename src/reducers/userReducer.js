import { USER_DATA } from '../constants/appConstants';

const initialState = {
  currentUser: null,
  isAuthenticated: false,
  fetching: false,
  fetched: false,
  error: null
};

function userReducer(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  // const nextState = Object.assign({}, state);

  switch (action.type) {
    case USER_DATA.INITSTATE: {
      return initialState;
    }
    case USER_DATA.INIT: {
      return {
        ...state,
        fetching: true,
        fetched: false,
        error: false
      };
    }
    case USER_DATA.START: {
      return {
        ...state,
        fetching: true,
        error: null
      };
    }
    case USER_DATA.REJECTED: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: action.payload
      };
    }
    case USER_DATA.FULFILLED: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: false,
        currentUser: action.payload,
        isAuthenticated: true
      };
    }
    case USER_DATA.LOGIN_START: {
      return {
        ...state,
        fetching: true,
        error: null
      };
    }
    case USER_DATA.LOGIN_FULFILLED: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: null,
        currentUser: action.payload,
        isAuthenticated: true
      };
    }
    case USER_DATA.LOGIN_REJECTED: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: action.payload,
        isAuthenticated: false
      };
    }
    case USER_DATA.REGISTER_START: {
      return {
        ...state,
        fetching: true,
        error: null
      };
    }
    case USER_DATA.REGISTER_FULFILLED: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: null,
        currentUser: action.payload,
        isAuthenticated: true
      };
    }
    case USER_DATA.REGISTER_REJECTED: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: action.payload,
        isAuthenticated: false
      };
    }
    case USER_DATA.LOGOUT_START: {
      return {
        ...state,
        fetching: true
      };
    }
    case USER_DATA.LOGOUT_FULFILLED: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: null,
        currentUser: null,
        isAuthenticated: false
      };
    }
    case USER_DATA.LOGOUT_REJECTED: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: action.payload
      };
    }
    case USER_DATA.CLEAR_ERROR: {
      return {
        ...state,
        error: null
      };
    }
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}

export default userReducer;