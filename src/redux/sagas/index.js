import { all } from "redux-saga/effects";
import { watchFetchOrders } from "./orderSaga";

export default function* rootSaga() {
  yield all([watchFetchOrders()]);
}
