

// import { all, call, put, takeLatest } from "redux-saga/effects";
// import {
//   fetchProductsRequest,
//   fetchProductsSuccess,
//   fetchProductsFailure,
// } from "../slices/productSlice";

// const fetchImage = async (product) => {
//   try {
//     const response = await fetch( {
//       method: "GET",
//       headers: {
//         Authorization:"",
//       },
//     });

//     if (!response.ok)
//       throw new Error(`Failed to fetch image for product ${product.productId}`);

//     const blob = await response.blob();
//     return URL.createObjectURL(blob);
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };

// const fetchProductsApi = async (filters = []) => {
//   const url = "";
//   const token = "";

//   const requestBody = {
//     userId: 0,
//     pageNumber: 1,
//     pageSize: 20,
//     name: "",
//     hasSearchText: false,
//     searchText: "",
//     bestSeller: false,
//     newArrival: false,
//     hasTagsSearch: filters.some((f) => f.type === 103),
//     tagsSearch: filters.filter((f) => f.type === 103).map((f) => f.id),
//     hasLocationsSearch: filters.some((f) => f.type === 105),
//     locationsSearch: filters.filter((f) => f.type === 105).map((f) => f.id),
//     hasBrandSearch: filters.some((f) => f.type === 104),
//     brandSearch: filters.filter((f) => f.type === 104).map((f) => f.id),
//   };
  
//   const response = await fetch(url, {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(requestBody),
//   });

//   if (!response.ok) {
//     throw new Error(`Error: ${response.status} - ${response.statusText}`);
//   }

//   const data = await response.json();
//   const products = data.response.products;

//   const productsWithImages = await Promise.all(
//     products.map(async (product) => ({
//       ...product,
//       imageSrc: await fetchImage(product),
//     }))
//   );

//   return productsWithImages;
// };

// function* fetchProductsSaga(action) {
//   try {
//     const filters = action.payload;
//     const products = yield call(fetchProductsApi, filters);
//     yield put(fetchProductsSuccess(products));
//   } catch (error) {
//     yield put(fetchProductsFailure(error.message));
//   }
// }

// function* watchFetchProducts() {
//   yield takeLatest(fetchProductsRequest.type, fetchProductsSaga);
// }
// export default function* productSaga() {
//   yield all([watchFetchProducts()]);
// }

import { all, call, put, select, takeLatest } from "redux-saga/effects";
import {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
} from "../slices/productSlice";

const fetchImage = async (product, token) => {
  try {
    const response = await fetch( {  
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });

    if (!response.ok)
      throw new Error(`Failed to fetch image for product ${product.productId}`);

    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error(error);
    return null;
  }
};


const selectToken = (state) => state.auth.token;

const fetchProductsApi = async (filters = [], token) => {
  const url = ""; 

  const requestBody = {
    pageNumber: 1,
    pageSize: 20,
    name: "",
    hasSearchText: false,
    searchText: "",
    bestSeller: false,
    newArrival: false,
    hasTagsSearch: filters.some((f) => f.type === 103),
    tagsSearch: filters.filter((f) => f.type === 103).map((f) => f.id),
    hasLocationsSearch: filters.some((f) => f.type === 105),
    locationsSearch: filters.filter((f) => f.type === 105).map((f) => f.id),
    hasBrandSearch: filters.some((f) => f.type === 104),
    brandSearch: filters.filter((f) => f.type === 104).map((f) => f.id),
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`, 
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }

  const data = await response.json();
  const products = data.response.products;

  const productsWithImages = await Promise.all(
    products.map(async (product) => ({
      ...product,
      imageSrc: await fetchImage(product, token),
    }))
  );

  return productsWithImages;
};

function* fetchProductsSaga(action) {
  try {
    const token = yield select(selectToken); // Get token from Redux store
    if (!token) throw new Error("Token not found, please login again.");

    const filters = action.payload;
    const products = yield call(fetchProductsApi, filters, token);
    yield put(fetchProductsSuccess(products));
  } catch (error) {
    yield put(fetchProductsFailure(error.message));
  }
}

function* watchFetchProducts() {
  yield takeLatest(fetchProductsRequest.type, fetchProductsSaga);
}

export default function* productSaga() {
  yield all([watchFetchProducts()]);
}
