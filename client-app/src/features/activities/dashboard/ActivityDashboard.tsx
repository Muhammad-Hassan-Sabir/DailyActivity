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
    handleOpenForm:(id:string)=>void;
    handleCloseForm:()=>void;
    createOrEditActivity:(activity:Activity)=>void;
    editMode:Boolean;
    deleteActivity:(id:string)=>void;
}

function ActivityDashboard({activities,handleSelectedActivity
        ,cancelSelectedActivity,selectedActivity,handleCloseForm,handleOpenForm,editMode,createOrEditActivity,deleteActivity}:Props) {
  return (
    <>
    <Grid>
        <Grid.Column width='10'>
            <ActivityList activities={activities} handleSelectedActivity={handleSelectedActivity} deleteActivity={deleteActivity}></ActivityList>
        </Grid.Column>
        <Grid.Column width='6'>
            {selectedActivity&& !editMode&&
            <ActivityDetails 
                    activity={selectedActivity}
                    cancelSelectedActivity={cancelSelectedActivity}
                    handleOpenForm={handleOpenForm}
                    ></ActivityDetails>}
                    {
                        editMode&&
                        <ActivityForm handleCloseForm={handleCloseForm} activity={selectedActivity} createOrEditActivity={createOrEditActivity} ></ActivityForm>
                    }
        </Grid.Column>
    </Grid>
    </>
  )
}

export default ActivityDashboard