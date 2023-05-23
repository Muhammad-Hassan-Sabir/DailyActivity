import React, { SyntheticEvent, useState } from "react";
import {
  Button,
  Icon,
  Item,
  Label,
  Segment,
  SegmentGroup,
} from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";
import { Link, NavLink } from "react-router-dom";
import { act } from "@testing-library/react";

interface Props {
  activity: Activity;
}

function ActivityListItem({ activity }: Props) {
  const { activityStore } = useStore();
  const { loading, deleteActivity } = activityStore;
  const [target, setTarget] = useState("");
  function handleActivityDelete(
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) {
    setTarget(e.currentTarget.name);
    deleteActivity(id);
  }

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image circular size="tiny" src="/assets/user.png" />
            <Item.Content>
              <Item.Header as={Link} to={`/activities/${activity.id}`}>
                {activity.title}
              </Item.Header>
              <Item.Description>Hosted by Bob</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" />
          {activity.date}
          <Icon name="marker" />
          {activity.venue}
        </span>
      </Segment>
      <Segment secondary>Attnedance go there</Segment>
      <Segment clearing>
        <span>{activity.description}
        <Button
          as={Link}
          to={`/activities/${activity.id}`}
          floated="right"
          content="View"
          color="blue"
        ></Button></span>
       
      </Segment>
    </Segment.Group>
  );
}

export default ActivityListItem;
