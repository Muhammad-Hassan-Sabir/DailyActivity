import {makeAutoObservable ,observable} from 'mobx'
import { Activity } from '../models/activity'
import agent from '../api/agent';
import { stat } from 'fs';

export default class ActivityStore{

    activities:Activity[]=[];
    selectedActivity:Activity|undefined=undefined;
    editMode=false;
    loadingInitial=false;
    loading=false;

    constructor(){
        makeAutoObservable(this)      
    }

    loadingActivities=async()=>{
        this.setLoadingInitial(true);
        try {
            const response=await agent.Activities.list();
            response.forEach((activity) => {
                activity.date = activity.date.split("T")[0];
                this.activities.push(activity);
              });
              this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }
    setLoadingInitial=(state:boolean)=>{
        this.loadingInitial=state;
    }

    selectActivity=(id:string)=>{
        this.selectedActivity=this.activities.find((x) => x.id === id);
    }
    cancelSelectActivity=()=>{
        this.selectedActivity=undefined;
    }
    openForm=(id? :string)=>{
        id?this.selectActivity(id):this.cancelSelectActivity();
        this.editMode=true;
    }
    closeForm=()=>{
        this.editMode=false;
    }

    
}
