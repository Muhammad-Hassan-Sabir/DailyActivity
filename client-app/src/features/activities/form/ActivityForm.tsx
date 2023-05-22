import   { ChangeEvent, useEffect, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';
import {  observer } from 'mobx-react-lite';
import { Link, useHistory, useParams } from 'react-router-dom';
import { v4 as uuid } from "uuid";

function ActivityForm( ) {
  const {activityStore} =useStore();
  const {loadingActivity,loading,createActivity,updateActivity}=activityStore;
  const {id}=useParams<{id:string}>();
  const history=useHistory();
  const [activity, setActivity] = useState({
            id:"",
            title:"",
            description:"",
            city: "",
            category: "",
            date: "",
            venue: ""
          });
 useEffect(() => {
   if(id) loadingActivity(id).then(activity=>setActivity(activity!))
 }, [id,loadingActivity])
 


const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const {name,value}=e.target;
  setActivity(values => ({...values, [name]: value}))
}
const handleSubmit=()=>{
  if (activity.id.length===0) {
    let newActivity={
      ...activity,id:uuid()
    }
    createActivity(newActivity).then(()=>history.push(`/activities/${newActivity.id}`))
   
  }
  else{
    updateActivity(activity).then(()=>history.push(`/activities/${activity.id}`))
  }
}
  return (
    <>
    <Segment clearing>
                <Form autoComplete="off" onSubmit={handleSubmit}>
                    <Form.Input name="title" value={activity.title} onChange={handleChange} placeholder='Title'></Form.Input>
                    <Form.TextArea name="description" value={activity.description} onChange={handleChange} placeholder='Description'></Form.TextArea>
                    <Form.Input name="category" value={activity.category} onChange={handleChange} placeholder='Category'></Form.Input>
                    <Form.Input name="date" type='date' value={activity.date} onChange={handleChange} placeholder='Date'></Form.Input>
                    <Form.Input name="city" value={activity.city} onChange={handleChange} placeholder='City'></Form.Input>
                    <Form.Input name="venue" value={activity.venue} onChange={handleChange} placeholder='Venue'></Form.Input>
                    <Button loading={loading} floated='right' type='submit' positive content="Submit" ></Button>
                    <Button as={Link} to="/activities" floated='right'  type='button' content="Cancel" ></Button>
                </Form>
    </Segment>
    </>
  )
}
export default observer(ActivityForm)