import React, { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import { List, Header, Container, Button } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import { useStore } from "../stores/store";
import {observer} from 'mobx-react-lite'
function App() {

  const {activityStore}=useStore();
  const [activities, setActivites] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    activityStore.loadingActivities();
  }, [activityStore]);

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
    setSubmitting(true);
    if (activity.id) {
      agent.Activities.update(activity).then(res=>{
        setActivites([...activities.filter((x) => x.id !== activity.id), activity,])
      });
    }
    else{
      activity.id=uuid();
      agent.Activities.create(activity).then(res=>{
        setActivites([...activities,activity]);
      })
    }
    setSelectedActivity(activity);
    setEditMode(false);
    setSubmitting(false);
  }
  function deleteActivity(id: string) {
    setSubmitting(true);
    agent.Activities.delete(id).then(res=>{
      setActivites([...activities.filter((a) => a.id !== id)]);
      setSubmitting(false);
    })
  }
  if (activityStore.loadingInitial) {
     return <LoadingComponent content="Loading app"></LoadingComponent>
  }
  
  return (
    <>
      <NavBar openForm={handleOpenForm} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activityStore.activities}
          handleSelectedActivity={handleSelectedActivity}
          cancelSelectedActivity={cancelSelectedActivity}
          selectedActivity={selectedActivity}
          handleCloseForm={handleCloseForm}
          handleOpenForm={handleOpenForm}
          editMode={editMode}
          createOrEditActivity={handleCreateOrEditActivity}
          deleteActivity={deleteActivity}
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default observer(App);
