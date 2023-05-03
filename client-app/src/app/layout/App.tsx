import React, { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import { List, Header, Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
function App() {
  const [activities, setActivites] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    agent.Activities.list().then((response) => {
      let activities: Activity[] = [];
      response.forEach((activity) => {
        activity.date = activity.date.split("T")[0];
        activities.push(activity);
      });
      setActivites(activities);
      setLoader(false);
    });
  }, []);

  function handleSelectedActivity(id: string) {
    setSelectedActivity(activities.find((x) => x.id === id));
    // handleCloseForm();
  }
  function cancelSelectedActivity() {
    setSelectedActivity(undefined);
  }
  function handleOpenForm(id?: string) {
    id ? handleSelectedActivity(id) : cancelSelectedActivity();
    setEditMode(true);
  }
  function handleCloseForm() {
    setEditMode(false);
  }
  function handleCreateOrEditActivity(activity: Activity) {
    activity.id
      ? setActivites([
          ...activities.filter((x) => x.id !== activity.id),
          activity,
        ])
      : setActivites([...activities, { ...activity, id: uuid() }]);
    setEditMode(false);
    setSelectedActivity(activity);
  }
  function deleteActivity(id: string) {
    setActivites([...activities.filter((a) => a.id !== id)]);
  }
  if (loader) {
     return <LoadingComponent content="Loading app"></LoadingComponent>
  }
  
  return (
    <>
      <NavBar openForm={handleOpenForm} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          handleSelectedActivity={handleSelectedActivity}
          cancelSelectedActivity={cancelSelectedActivity}
          selectedActivity={selectedActivity}
          handleCloseForm={handleCloseForm}
          handleOpenForm={handleOpenForm}
          editMode={editMode}
          createOrEditActivity={handleCreateOrEditActivity}
          deleteActivity={deleteActivity}
        />
      </Container>
    </>
  );
}

export default App;
