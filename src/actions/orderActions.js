import { ORDER_DATA } from '../constants/appConstants';

export function addOrder(orderData) {
    return {
        type: ORDER_DATA.ADD_ORDER,
        payload: orderData
    };
}

export function getOrders() {
    return {
        type: ORDER_DATA.GET_ORDERS
    };
}

export function getOrderDetail(orderId) {
    return {
        type: ORDER_DATA.GET_ORDER_DETAIL,
        payload: orderId
    };
}

export function clearOrders() {
    return {
        type: ORDER_DATA.CLEAR_ORDERS
    };
}
