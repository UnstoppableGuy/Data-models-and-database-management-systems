import { Route, Switch } from "react-router-dom";
import CategoryTable from "./Components/Category/CategoryTable";
import CreateCategory from "./Components/Category/CreateCategory";
import UpdateCategory from "./Components/Category/UpdateCategory";
import LogsTable from "./Components/Logs/LogsTable";
import AddImage from "./Components/Products/AddImage";
// import Navigation from "./Components/Navigation";
import CreateProduct from "./Components/Products/CreateProduct";
import ProductsTable from "./Components/Products/ProductsTable";
import UpdateProduct from "./Components/Products/updateProduct";
import CreateStore from "./Components/Stores/CreateStore";
import StoresTable from "./Components/Stores/StoresTable";
import UpdateStore from "./Components/Stores/UpdateStore";
import AdminPage from "./Pages/Admin";
import CatalogPage from "./Pages/Catalog";
import HomePage from "./Pages/Home";
import LoginPage from "./Pages/Login";
import RegisterPage from "./Pages/Register";
import UserPage from "./Pages/User";
import Orders from "./Pages/User/Orders";
import UserProducts from "./Pages/User/Products";
import Profile from "./Pages/User/Profile";

function App() {
  return (
    <>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/" component={HomePage} exact />
        <Route path="/catalog" component={CatalogPage} />
        <div>
          <Route path="/admin" component={AdminPage} />
          <Route path="/admin/categories" component={CategoryTable} />
          <Route path="/admin/createCategory" component={CreateCategory} />
          <Route path="/admin/updateCategory" component={UpdateCategory} />

          <Route path="/admin/products" component={ProductsTable} />
          <Route path="/admin/createProduct" component={CreateProduct} />
          <Route path="/admin/updateProduct" component={UpdateProduct} />
          <Route path="/admin/addImage" component={AddImage} />

          <Route path="/admin/stores" component={StoresTable} />
          <Route path="/admin/createStore" component={CreateStore} />
          <Route path="/admin/updateStore" component={UpdateStore} />

          <Route path="/admin/logs" component={LogsTable} />

          <Route path="/user" component={UserPage} />
          <Route path="/user/products" component={UserProducts} />
          <Route path="/user/orders" component={Orders} />
          <Route path="/user/profile" component={Profile} />
        </div>
      </Switch>
    </>
  );
}

export default App;
