import React from 'react'
import { Button, Item, Label, Segment } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity';

interface Props{
    activities:Activity[];
}

export default function ActivityList({activities}:Props) {
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
                        <Button floated='right' content="View" color='blue'></Button>
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
