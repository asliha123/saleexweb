
import { all, call, put, takeLatest, select } from "redux-saga/effects";
import {
  fetchOrdersRequest,
  fetchOrdersSuccess,
  fetchOrdersFailure,
} from "../slices/orderSlice";

// Selector to get token from Redux store
const selectToken = (state) => state.auth.token;

// API Call Function
function* fetchOrdersAPI() {
  try {
    const token = yield select(selectToken); 
    const url = "https://laptop-9efu9o2s/OrderProcessorApi/OrderProcessor/Orders"; 

    const response = yield call(fetch, url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: 0,
        pageNumber: 1,
        pageSize: 11,
        periodId: 0,
        days: 0,
        start: "2024-11-10T04:34:14.795Z",
        end: "2024-12-27T22:34:14.795Z",
        isCredit: 0,
        states: [],
        clients: [],
        tags: [],
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = yield response.json();
    return data.response.orders;
  } catch (error) {
    throw error;
  }
}

// Saga Worker
function* fetchOrders() {
  try {
    const orders = yield call(fetchOrdersAPI);
    yield put(fetchOrdersSuccess(orders));
  } catch (error) {
    yield put(fetchOrdersFailure(error.message));
  }
}

// Saga Watcher
export function* watchFetchOrders() {
  yield takeLatest(fetchOrdersRequest.type, fetchOrders);
}

// Root Order Saga
export default function* orderSaga() {
  yield all([watchFetchOrders()]);
}
