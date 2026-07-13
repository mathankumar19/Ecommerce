import { CATEGORY_DATA } from '../constants/appConstants';

export function fetchCategories() {
    return {
        type: CATEGORY_DATA.FETCH_CATEGORIES_START
    };
}

export function fetchCategoriesSuccess(categories) {
    return {
        type: CATEGORY_DATA.FETCH_CATEGORIES_FULFILLED,
        payload: categories
    };
}

export function fetchCategoriesFailure(error) {
    return {
        type: CATEGORY_DATA.FETCH_CATEGORIES_REJECTED,
        payload: error
    };
}

export function fetchCategoryProducts(category) {
    return {
        type: CATEGORY_DATA.FETCH_CATEGORY_PRODUCTS_START,
        payload: category
    };
}

export function fetchCategoryProductsSuccess(products) {
    return {
        type: CATEGORY_DATA.FETCH_CATEGORY_PRODUCTS_FULFILLED,
        payload: products
    };
}

export function fetchCategoryProductsFailure(error) {
    return {
        type: CATEGORY_DATA.FETCH_CATEGORY_PRODUCTS_REJECTED,
        payload: error
    };
}
