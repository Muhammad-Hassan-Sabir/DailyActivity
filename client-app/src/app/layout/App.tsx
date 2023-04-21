import React, { useEffect, useLayoutEffect, useState } from 'react';
import axios from "axios";
import { List,Header, Container} from 'semantic-ui-react'
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
function App() {
  const [activities, setActivites] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity|undefined>(undefined)
  useEffect(()=>{
    axios.get<Activity[]>("http://localhost:5086/api/activities")
        .then((response)=>{
          setActivites(response.data)
        });
  },[]);

  function handleSelectedActivity(id:string) {
    setSelectedActivity(activities.find(x=>x.id===id));
  }
  function cancelSelectedActivity() {
    setSelectedActivity(undefined);
  }


  return (
    <>
      <NavBar/>
      <Container style={{marginTop:'7em'}}>
      <ActivityDashboard 
      activities={activities}
      handleSelectedActivity={handleSelectedActivity}
      cancelSelectedActivity={cancelSelectedActivity}
      selectedActivity={selectedActivity}
      />
      </Container>
   
    </>
  );
}

export default App;
