import { makeAutoObservable, observable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { ServerError } from "../models/serverError";

export default class CommonStore {
  error: ServerError | null = null;
  token: string | null = window.localStorage.getItem("jwt");
  appLoaded = false;
  constructor() {
    makeAutoObservable(this);
    reaction(
        ()=>this.token,
        token=>{
            if (token) {
                window.localStorage.setItem('jwt',token)         
            }
            else{
                window.localStorage.removeItem('jwt');
            }
        }
    )
  }

  setError = (error: ServerError) => {
    this.error = error;
  };

  setToken = (token: string | null) => {
    this.token = token;
  };

  setappLoaded = () => {
    this.appLoaded = true;
  };
}
