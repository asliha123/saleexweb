import {all, call, put, takeLatest } from "redux-saga/effects";
import {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
} from "../slices/productSlice";


const fetchImage = async (product) => {
  try {
    const response = await fetch(
     '',
      {
        method: "GET",
        headers: {
          Authorization: "", 
        },
      }
    );

    if (!response.ok) throw new Error(`Failed to fetch image for product ${product.productId}`);

    const blob = await response.blob();
    return URL.createObjectURL(blob); 
  } catch (error) {
    console.error(error);
    return null; 
  }
};
const fetchProductsApi = async () => {
  const url = "";
  const token = "";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "userId": 0,
      "pageNumber": 1,
      "pageSize": 20,
      "name": "",
      "hasSearchText": false,
      "searchText": "Special",
      "bestSeller": false,
      "newArrival": false,
      "hasTagsSearch": false,
      "tagsSearch": [102],
      "hasLocationsSearch": false,
      "locationsSearch": [101],
      "hasBrandSearch": false,
      "brandSearch": [101],
    }),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }

  const data = await response.json();
  const products = data.response.products;

  // Fetch images for each product in parallel
  const productsWithImages = await Promise.all(
    products.map(async (product) => ({
      ...product,
      imageSrc: await fetchImage(product), // Attach image to product
    }))
  );

  return productsWithImages;
};
function* fetchProductsSaga() {
  try {
    const products = yield call(fetchProductsApi);
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




