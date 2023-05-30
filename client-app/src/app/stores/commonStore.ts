import {makeAutoObservable ,observable, runInAction} from 'mobx'
import agent from '../api/agent';
import { ServerError } from '../models/serverError';

export default class CommonStore{
    error:ServerError|null=null;

    constructor(){
        makeAutoObservable(this);
    }

    setError=(error:ServerError)=>{
        this.error=error;
    }

}