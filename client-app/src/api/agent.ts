import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = "https://localhost:5001";

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
};

const Weather = {
  list: () => requests.get("/WeatherForecast"),
};

const Account = {
  login: (user: any) => requests.post("/account/login", user),
  register: (user: any) => requests.post("/account/register", user),
};

const Categories = {
  get: () => requests.get("/admin/categories"),
  addCategory: (category: any) => requests.post("/admin/categories", category),
  updateCategory: (category: any) =>
    requests.put("/admin/categories", category),
};

const Products = {
  get: () => requests.get("/admin/products"),
  getImages: (productId: string) =>
    requests.get(`/admin/productImages?productId=${productId}`),
  addImage: (image: any) => requests.post("/admin/productImages", image),
  deleteImage: (id: string, productId: string, url: string) =>
    requests.del(
      `/admin/productImages?id=${id}&productId=${productId}&url=${url}`
    ),
  getFiltered: (category: string) =>
    requests.get(`/admin/filteredProducts?category=${category}`),
  getProductStores: (productId: string) =>
    requests.get(`/admin/productStores?productId=${productId}`),
  addProduct: (product: any, storeName: string) =>
    requests.post(`/admin/products?store=${storeName}`, product),
  updateProduct: (product: any) => requests.put("/admin/products", product),
  removeProduct: (id: string) => requests.del(`/admin/products?id=${id}`),
};

const Stores = {
  get: () => requests.get("/admin/stores"),
  addStore: (store: any) => requests.post("/admin/stores", store),
  updateStore: (store: any) => requests.put("/admin/stores", store),
};

const User = {
  createOrder: (accountId: string, productId: string) =>
    requests.post(
      `/user/order?accountId=${accountId}&productId=${productId}`,
      {}
    ),
  get: (accountId: string) =>
    requests.get(`/user/order?accountId=${accountId}`),
};

const Logs = {
  get: () => requests.get("/admin/logs"),
};

const agent = {
  Weather,
  Account,
  Categories,
  Products,
  Stores,
  Logs,
  User,
};

export default agent;
