import { makeAutoObservable, runInAction } from "mobx";

export default class ProductStore {
  products: any = [];
  productStores: any = [];

  constructor() {
    makeAutoObservable(this);
  }

  setProducts = (products: any) => {
    runInAction(() => {
      this.products = products;
    });
  };
}
