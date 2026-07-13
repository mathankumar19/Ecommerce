import { CATEGORY_DATA } from '../constants/appConstants';

const initialState = {
    categories: [],
    categoryProducts: [],
    loading: false,
    error: null
};

function categoryReducer(state = initialState, action) {
    switch (action.type) {
        case CATEGORY_DATA.FETCH_CATEGORIES_START:
        case CATEGORY_DATA.FETCH_CATEGORY_PRODUCTS_START:
            return {
                ...state,
                loading: true,
                error: null
            };

        case CATEGORY_DATA.FETCH_CATEGORIES_FULFILLED:
            return {
                ...state,
                loading: false,
                categories: action.payload
            };

        case CATEGORY_DATA.FETCH_CATEGORY_PRODUCTS_FULFILLED:
            return {
                ...state,
                loading: false,
                categoryProducts: action.payload
            };

        case CATEGORY_DATA.FETCH_CATEGORIES_REJECTED:
        case CATEGORY_DATA.FETCH_CATEGORY_PRODUCTS_REJECTED:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        default:
            return state;
    }
}

export default categoryReducer;
