import { createContext, useContext } from "react";
import CategoryStore from "./Category";
import OrderStore from "./Order";
import ProductStore from "./Product";
import StoresStore from "./Stores";
import UserStore from "./User";

interface Store {
  userStore: UserStore;
  categoryStore: CategoryStore;
  productStore: ProductStore;
  storesStore: StoresStore;
  orderStore: OrderStore;
}

export const store: Store = {
  userStore: new UserStore(),
  categoryStore: new CategoryStore(),
  productStore: new ProductStore(),
  storesStore: new StoresStore(),
  orderStore: new OrderStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
