import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { Profile } from '../../app/models/profile'
import { Button, Grid, GridColumn, GridRow, Header, Tab } from 'semantic-ui-react'
import MyTextInput from '../../app/common/form/MyTextInput'
import { Formik } from 'formik'
import EditProfileForm from './form/EditProfileForm'
interface Props{
    profile:Profile|null
}
function ProfileAbout({profile}:Props) {
const [editMode, setEditMode] = useState(false)
const handlToggleMode =()=>{
    setEditMode(!editMode);
}
  return (
    <Tab.Pane>
        <Grid>
            <GridRow>
                <GridColumn width={8} >
                    <Header icon="user" content="About"></Header>
                </GridColumn>
                <GridColumn width={8} textAlign="right">
                <Button onClick={handlToggleMode} content={editMode ? 'Cancel' : 'Edit Profile'}></Button>
                </GridColumn>
            </GridRow>
            <GridRow>
                <GridColumn width={16} style={{ whiteSpace: 'pre-wrap' }}>
                    {
                        editMode ? (<EditProfileForm profile={profile} setEditMode={setEditMode}/> )
                        : (profile?.bio || 'No bio')
                    }
                </GridColumn>
            </GridRow>
        </Grid>
    </Tab.Pane>
  )
}

export default observer(ProfileAbout)