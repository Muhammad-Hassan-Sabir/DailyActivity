import React, { ChangeEvent, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity';
import { title } from 'process';

interface Props{
  activity:Activity|undefined
  handleCloseForm:()=>void;
}

export default function ActivityForm({handleCloseForm,activity:selectedActivity}:Props) {
   const activityInitialState=selectedActivity?? {
    id:"",
    title:"",
    description:"",
    city: "",
    category: "",
    date: "",
    venue: ""
  }
  const [activity, setActivity] = useState(activityInitialState);

const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const {name,value}=e.target;
  setActivity(values => ({...values, [name]: value}))
}
const handleSubmit=()=>{
  console.log(activity)
}
  return (
    <>
    <Segment clearing>
                <Form autoComplete="off" onSubmit={handleSubmit}>
                    <Form.Input name="title" value={activity.title} onChange={handleChange} placeholder='Title'></Form.Input>
                    <Form.TextArea name="description" value={activity.description} onChange={handleChange} placeholder='Description'></Form.TextArea>
                    <Form.Input name="category" value={activity.category} onChange={handleChange} placeholder='Category'></Form.Input>
                    <Form.Input name="date" value={activity.date} onChange={handleChange} placeholder='Date'></Form.Input>
                    <Form.Input name="city" value={activity.city} onChange={handleChange} placeholder='City'></Form.Input>
                    <Form.Input name="venue" value={activity.venue} onChange={handleChange} placeholder='Venue'></Form.Input>
                    <Button floated='right' type='submit' positive content="Submit" ></Button>
                    <Button floated='right' onClick={handleCloseForm} type='button' content="Cancel" ></Button>
                </Form>
    </Segment>
    </>
  )
}
