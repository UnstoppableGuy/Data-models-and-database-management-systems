import { makeAutoObservable, runInAction } from "mobx";

export default class CategoryStore {
  categories: any = [];

  constructor() {
    makeAutoObservable(this);
  }

  setCategories = (categories: any) => {
    runInAction(() => {
      this.categories = categories;
    });
  };
}
