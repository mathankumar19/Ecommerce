import { call, put, takeLatest } from 'redux-saga/effects';
import { CATEGORY_DATA } from '../constants/appConstants';
import {
    fetchCategoriesSuccess,
    fetchCategoriesFailure,
    fetchCategoryProductsSuccess,
    fetchCategoryProductsFailure
} from '../actions/categoryActions';
import { fetchCategoriesData, fetchCategoryProductsData } from '../API/categoryAPI';

function* fetchCategoriesSaga() {
    try {
        const categories = yield call(fetchCategoriesData);
        yield put(fetchCategoriesSuccess(categories));
    } catch (error) {
        yield put(fetchCategoriesFailure(error.message));
    }
}

function* fetchCategoryProductsSaga(action) {
    try {
        const data = yield call(fetchCategoryProductsData, action.payload);
        yield put(fetchCategoryProductsSuccess(data.products));
    } catch (error) {
        yield put(fetchCategoryProductsFailure(error.message));
    }
}

export default function* categorySaga() {
    yield takeLatest(CATEGORY_DATA.FETCH_CATEGORIES_START, fetchCategoriesSaga);
    yield takeLatest(CATEGORY_DATA.FETCH_CATEGORY_PRODUCTS_START, fetchCategoryProductsSaga);
}
