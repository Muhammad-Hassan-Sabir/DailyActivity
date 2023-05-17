import React from 'react'
import { Form, Grid, List, Segment } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
interface Props{
    activities:Activity[];
    createOrEditActivity:(activity:Activity)=>void;
    deleteActivity:(id:string)=>void;
    submitting:boolean;
}

function ActivityDashboard({activities,createOrEditActivity,deleteActivity,submitting}:Props) {
    const {activityStore}=useStore();
    const {editMode,selectedActivity}=activityStore
  return (
    <>
    <Grid>
        <Grid.Column width='10'>
            <ActivityList activities={activities} deleteActivity={deleteActivity} submitting={submitting}></ActivityList>
        </Grid.Column>
        <Grid.Column width='6'>
            {selectedActivity&& !editMode&&
            <ActivityDetails/> }
            {
                editMode&&
                <ActivityForm  submitting={submitting}   createOrEditActivity={createOrEditActivity} ></ActivityForm>
            }
        </Grid.Column>
    </Grid>
    </>
  )
}

export default observer(ActivityDashboard)