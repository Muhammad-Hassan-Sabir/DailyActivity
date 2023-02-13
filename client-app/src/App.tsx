import React, { useEffect, useLayoutEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";
import { List,Header} from 'semantic-ui-react'
function App() {
  const [activites, setActivites] = useState([]);
  useEffect(()=>{
    axios.get("http://localhost:5086/api/activities")
        .then((response)=>{
          console.log(response);
          setActivites(response.data)
        });
  },[]);

  return (
    <div className="App">
      <Header as='h2' icon='users' content='Daily Activity'></Header>
      <List>
      {activites.map((activity:any)=>(
        <List.Item key={activity.id}>{activity.title}</List.Item>
      ))}
      </List>
    </div>
  );
}

export default App;
