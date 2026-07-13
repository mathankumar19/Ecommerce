import {
  FETCH_DEPARTMENT_REQUEST,
  FETCH_DEPARTMENT_SUCCESS,
  FETCH_DEPARTMENT_FAILURE
} from './types';
import { fetchDepartmentData } from '../API/departmentAPI';

// Action creators for department data
export const fetchDepartmentRequest = (departmentType) => ({
  type: FETCH_DEPARTMENT_REQUEST,
  payload: { departmentType }
});

export const fetchDepartmentSuccess = (data) => ({
  type: FETCH_DEPARTMENT_SUCCESS,
  payload: data
});

export const fetchDepartmentFailure = (error) => ({
  type: FETCH_DEPARTMENT_FAILURE,
  payload: error
});

// Thunk action to fetch department data
export const fetchDepartment = (departmentType) => {
  return async (dispatch) => {
    dispatch(fetchDepartmentRequest(departmentType));
    
    try {
      const data = await fetchDepartmentData(departmentType);
      dispatch(fetchDepartmentSuccess(data));
    } catch (error) {
      dispatch(fetchDepartmentFailure(error.message));
    }
  };
};