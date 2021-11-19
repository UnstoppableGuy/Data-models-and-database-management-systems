import { makeAutoObservable, runInAction } from "mobx";

export default class StoresStore {
  stores: any = [];

  constructor() {
    makeAutoObservable(this);
  }

  setStores = (stores: any) => {
    runInAction(() => {
      this.stores = stores;
    });
  };
}