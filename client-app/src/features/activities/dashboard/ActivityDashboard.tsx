import { Grid } from 'semantic-ui-react'
import ActivityList from './ActivityList';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import LoadingComponent from '../../../app/layout/LoadingComponent';


function ActivityDashboard() {
    const {activityStore}=useStore();
    const {activityRegistry,loadingActivities}=activityStore
    useEffect(() => {
        if(activityRegistry.size<=1) loadingActivities();
      }, [activityRegistry.size,loadingActivities]);
     
     
      if (activityStore.loadingInitial) {
         return <LoadingComponent content="Loading app"></LoadingComponent>
      }
      
  return (
    <>
    <Grid>
        <Grid.Column width='10'>
            <ActivityList/>
        </Grid.Column>
        <Grid.Column width='6'>
            Filter Place
        </Grid.Column>
    </Grid>
    </>
  )
}

export default observer(ActivityDashboard)