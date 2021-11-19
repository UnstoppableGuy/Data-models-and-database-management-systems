import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import UserModel from "../Models/User";

export default class UserStore {
  currentUser: any;

  constructor() {
    makeAutoObservable(this);
  }

  setUser = (user: any) => {
    runInAction(() => {
      this.currentUser = user;
    });
  };

  setUser1 = async (user: any, history: any) => {
    console.log("user", user);
    const item = await agent.Account.login(user);
    console.log("item", item);
    runInAction(() => {
      this.currentUser = item;
    });
  };
}
