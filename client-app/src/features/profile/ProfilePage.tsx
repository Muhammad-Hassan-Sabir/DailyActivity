import React, { useEffect } from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import { Grid } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../app/layout/LoadingComponent";

function ProfilePage() {
  const {profileStore}=useStore()
  const {profile,getProfile,loadingProfile}=profileStore
  const {username}=useParams<{username:string}>();
  useEffect(() => {
    if(username)
    {
       getProfile(username);
    }
  }, [getProfile,username])
  
  if(loadingProfile) return <LoadingComponent content="Loading profile..."></LoadingComponent>

  return (
    <Grid.Column width={16}>
      <ProfileHeader profile={profile}/>
      <ProfileContent profile={profile}/>      
    
    </Grid.Column>
  );
}

export default  observer(ProfilePage);
