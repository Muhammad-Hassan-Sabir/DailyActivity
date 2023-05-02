import React, { useEffect, useLayoutEffect, useState } from 'react';
import axios from "axios";
import { List,Header, Container} from 'semantic-ui-react'
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
function App() {
  const [activities, setActivites] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity|undefined>(undefined)
  const [editMode, setEditMode] = useState(false)
  useEffect(()=>{
    axios.get<Activity[]>("http://localhost:5086/api/activities")
        .then((response)=>{
          setActivites(response.data)
        });
  },[]);

  function handleSelectedActivity(id:string) {
    setSelectedActivity(activities.find(x=>x.id===id));
    // handleCloseForm();
  }
  function cancelSelectedActivity() {
    setSelectedActivity(undefined);
  }
  function handleOpenForm(id?:string) {
    id?handleSelectedActivity(id):cancelSelectedActivity();
    setEditMode(true);
  }
  function handleCloseForm() {
    setEditMode(false);
  }
  function handleCreateOrEditActivity(activity:Activity) {
    activity.id
      ? setActivites([...activities.filter(x=>x.id!==activity.id),activity])
      : setActivites([...activities,{...activity,id:uuid()}])
    setEditMode(false);
    setSelectedActivity(activity);
  }

  return (
    <>
      <NavBar openForm={handleOpenForm}/>
      <Container style={{marginTop:'7em'}}>
      <ActivityDashboard 
      activities={activities}
      handleSelectedActivity={handleSelectedActivity}
      cancelSelectedActivity={cancelSelectedActivity}
      selectedActivity={selectedActivity}
      handleCloseForm={handleCloseForm}
      handleOpenForm={handleOpenForm}
      editMode={editMode}
      createOrEditActivity={handleCreateOrEditActivity}
      />
      </Container>
   
    </>
  );
}

export default App;
