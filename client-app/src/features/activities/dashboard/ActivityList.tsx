import React, { SyntheticEvent, useState } from 'react'
import { Button, Item, Label, Segment } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity';

interface Props{
    activities:Activity[];
    handleSelectedActivity:(id:string)=>void;
    deleteActivity:(id:string)=>void;
    submitting:boolean
}

export default function ActivityList({activities,handleSelectedActivity,deleteActivity,submitting}:Props) {
    const [target, setTarget] = useState("");
    function handleActivityDelete(e:SyntheticEvent<HTMLButtonElement>,id:string) {
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }

  return (
    <>
    <Segment>
        <Item.Group divided>
        {activities.map(actvity=>(
            <Item key={actvity.id}>
                <Item.Content>
                    <Item.Header as='a'>{actvity.title}</Item.Header>
                    <Item.Meta>{actvity.date}</Item.Meta>
                    <Item.Description>
                        <div>{actvity.description}</div>
                        <div>{actvity.city}, {actvity.venue}</div>
                        </Item.Description>
                    <Item.Extra>
                        <Button onClick={()=>handleSelectedActivity(actvity.id)} floated='right' content="View" color='blue'></Button>
                        <Button
                        name={actvity.id}
                        loading={submitting && target==actvity.id}
                        onClick={(e)=>handleActivityDelete(e,actvity.id)}
                        floated='right'
                        content="Delete"
                        color='red'></Button>

                        <Label basic content={actvity.category}></Label>
                    </Item.Extra>
                </Item.Content>
            </Item>
        ))}

        </Item.Group>
    </Segment>
    </>
  )
}
