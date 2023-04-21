import React from 'react'
import { Form, Grid, List, Segment } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
interface Props{
    activities:Activity[];
    handleSelectedActivity:(id:string)=>void;
    cancelSelectedActivity:()=>void;
    selectedActivity:Activity|undefined;
}

function ActivityDashboard({activities,handleSelectedActivity
        ,cancelSelectedActivity,selectedActivity}:Props) {
  return (
    <>
    <Grid>
        <Grid.Column width='10'>
            <ActivityList activities={activities} handleSelectedActivity={handleSelectedActivity}></ActivityList>
        </Grid.Column>
        <Grid.Column width='6'>
            {selectedActivity&&<ActivityDetails 
            activity={selectedActivity} cancelSelectedActivity={cancelSelectedActivity}></ActivityDetails>}
            <ActivityForm></ActivityForm>
        </Grid.Column>
    </Grid>
    </>
  )
}

export default ActivityDashboard