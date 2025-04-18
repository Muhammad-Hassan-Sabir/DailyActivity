import { makeAutoObservable, runInAction } from "mobx";
import { User, UserFormValues } from "../models/user";
import agent from "../api/agent";
import { store } from "./store";
import { history } from "../..";

export default class UserStore {
    user: User | null = null;


    constructor() {
        makeAutoObservable(this);
    }
    get isLoggedIn() {
        return !!this.user;
    }

    login = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => {
                this.user = user;
            })
            history.push("/activities")
            store.modalStore.closeModal()
        } catch (error) {
            throw error;
        }
    }
    logout = async () => {
        store.commonStore.setToken(null);
        this.user = null;
        window.localStorage.removeItem('jwt');
        history.push('/');
    }

    getUser = async () => {
        try {
            const user = await agent.Account.current();
            runInAction(() => this.user = user)
        } catch (error) {
            console.log(error)
        }
    }

    register = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.register(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => {
                this.user = user;
            })
            history.push("/activities")
            store.modalStore.closeModal()
        } catch (error) {
            throw error;
        }
    }

    setDisplayName = async (displayName: string) => {
        try {
            runInAction(() => {
                if (this.user != null) {
                    this.user.displayName = displayName;
                }
            })
        } catch (error) {
            console.error("Failed to update display name:", error);
            throw error;
        }
    }



}

