import { Grid } from 'semantic-ui-react'
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';


function ActivityDashboard() {
    const {activityStore}=useStore();
    const {editMode,selectedActivity}=activityStore
  return (
    <>
    <Grid>
        <Grid.Column width='10'>
            <ActivityList/>
        </Grid.Column>
        <Grid.Column width='6'>
            {selectedActivity&& !editMode&&
            <ActivityDetails/> }
            {
                editMode&&
                <ActivityForm ></ActivityForm>
            }
        </Grid.Column>
    </Grid>
    </>
  )
}

export default observer(ActivityDashboard)