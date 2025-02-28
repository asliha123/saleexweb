// import { configureStore } from "@reduxjs/toolkit";
// import createSagaMiddleware from "redux-saga";
// import rootSaga from "./sagas";
// import orderReducer from "./slices/orderSlice";

// const sagaMiddleware = createSagaMiddleware();

// const store = configureStore({
//   reducer: {
//     orders: orderReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
// });

// sagaMiddleware.run(rootSaga);

// export default store;
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import orderReducer from "./slices/orderSlice";
import productReducer from "./slices/productSlice";
import orderSaga from "./sagas/orderSaga";
import productSaga from "./sagas/productSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    orders: orderReducer,
    products: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(orderSaga);
sagaMiddleware.run(productSaga);

export default store;
