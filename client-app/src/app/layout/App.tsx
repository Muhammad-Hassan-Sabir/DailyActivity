import React, { useEffect, useLayoutEffect, useState } from 'react';
import axios from "axios";
import { List,Header, Container} from 'semantic-ui-react'
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
function App() {
  const [activities, setActivites] = useState<Activity[]>([]);
  useEffect(()=>{
    axios.get<Activity[]>("http://localhost:5086/api/activities")
        .then((response)=>{
          setActivites(response.data)
        });
  },[]);

  return (
    <>
      <NavBar/>
      <Container style={{marginTop:'7em'}}>
      <ActivityDashboard activities={activities} />
      </Container>
   
    </>
  );
}

export default App;
