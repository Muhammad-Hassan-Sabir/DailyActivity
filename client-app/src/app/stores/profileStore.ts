import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Profile } from "../models/profile";
import { store } from "./store";
import { history } from "../..";
export default class ProfileStore {
  profile: Profile | null = null;
  loadingProfile=false;
  constructor() {
    makeAutoObservable(this);
  }
  
  public get isCurrentUser(){
    if (store.userStore.user && this.profile) {
      return store.userStore.user?.userName==this.profile?.username;
    }
    return false;
  }
  
  getProfile = async (userName: string) => {
    this.loadingProfile=true;
    try {
      var profile = await agent.Profiles.getProfile(userName);
      runInAction(() => {
        this.profile = profile;
        this.loadingProfile=false;
      });
    } catch (error) {
        console.log(error);
        runInAction(()=>{
          this.loadingProfile=false;
        })
    }
  };

  uploadProfilePhoto=async (photo:Blob,photoName:string) => {
    try {
      const uploadPhoto=await agent.Profiles.uploadProfilePhoto(photo,photoName).then(
        x=>this.getProfile(store.userStore.user?.userName!)
      );
      runInAction(()=>{
      })
      // history.push("/activities")
    } catch (error) {
      console.log(error);
    }
  };

}
