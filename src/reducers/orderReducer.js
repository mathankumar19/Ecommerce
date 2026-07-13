import { ORDER_DATA } from '../constants/appConstants';

const initialState = {
    orders: [],
    selectedOrder: null,
    loading: false,
    error: null
};

function orderReducer(state = initialState, action) {
    switch (action.type) {
        case ORDER_DATA.INITSTATE: {
            return initialState;
        }

        case ORDER_DATA.ADD_ORDER: {
            const newOrder = {
                ...action.payload,
                id: action.payload.orderNumber,
                createdAt: new Date().toISOString()
            };

            return {
                ...state,
                orders: [newOrder, ...state.orders]
            };
        }

        case ORDER_DATA.GET_ORDERS: {
            return {
                ...state,
                loading: false
            };
        }

        case ORDER_DATA.GET_ORDER_DETAIL: {
            const order = state.orders.find(o => o.orderNumber === action.payload);
            return {
                ...state,
                selectedOrder: order || null
            };
        }

        case ORDER_DATA.CLEAR_ORDERS: {
            return {
                ...state,
                orders: []
            };
        }

        default: {
            return state;
        }
    }
}

export default orderReducer;
