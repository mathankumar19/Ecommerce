import {
  FETCH_DEPARTMENT_REQUEST,
  FETCH_DEPARTMENT_SUCCESS,
  FETCH_DEPARTMENT_FAILURE
} from '../actions/types';

const initialState = {
  loading: false,
  data: null,
  error: null,
  currentDepartment: null
};

const departmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DEPARTMENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        currentDepartment: action.payload.departmentType
      };
    case FETCH_DEPARTMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null
      };
    case FETCH_DEPARTMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default departmentReducer;