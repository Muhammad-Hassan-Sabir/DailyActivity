import React from 'react'
import { Button, Card, Icon, Image } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity';

interface Props{
    activity:Activity;
    cancelSelectedActivity:()=>void;
}
export default function ActivityDetails({activity,cancelSelectedActivity}:Props) {
  return (
    <>
     <Card fluid>
    <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
    <Card.Content>
      <Card.Header>{activity.title}</Card.Header>
      <Card.Meta>
        {activity.date}
      </Card.Meta>
      <Card.Description>
        {activity.description}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Button.Group widths='2'>
        <Button basic color='blue' content="Edit"></Button>
        <Button onClick={cancelSelectedActivity} basic color='grey' content="Cancel"></Button>
      </Button.Group>
    </Card.Content>
  </Card>

    </>
  )
}
