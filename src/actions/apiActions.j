import * as types from './types';

export const apiRequest = (payload) => ({
  type: types.API_REQUEST,
  payload
});

export const apiSuccess = (data) => ({
  type: types.API_SUCCESS,
  payload: data
});

export const apiFailed = (error) => ({
  type: types.API_FAILED,
  payload: error
});