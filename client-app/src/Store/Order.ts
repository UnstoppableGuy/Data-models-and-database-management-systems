import { makeAutoObservable, runInAction } from "mobx";

export default class OrderStore {
  orders: any = [];

  constructor() {
    makeAutoObservable(this);
  }

  setCategories = (orders: any) => {
    runInAction(() => {
      this.orders = orders;
    });
  };
}