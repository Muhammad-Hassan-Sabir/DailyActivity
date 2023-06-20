import { SyntheticEvent, useState } from "react";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { act } from "@testing-library/react";
import ActivityListItemAttendee from "./ActivityListItemAttendee";
interface Props {
  activity: Activity;
}

function ActivityListItem({ activity }: Props) {
  const { activityStore, userStore } = useStore();
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
        {
          activity.isCancelled && 
          <Label attached="top" color="red" content="Cancelled" style={{textAlign:'center'}}></Label>
        }
        <Item.Group>
          <Item>
            <Item.Image style={{marginBottom:10}} circular size="tiny" src="/assets/user.png" />
            <Item.Content>
              <Item.Header as={Link} to={`/activities/${activity.id}`}>
                {activity.title}
              </Item.Header>
              <Item.Description>
                Hosted by {activity.host?.displayName}{" "}
              </Item.Description>
              <Item.Extra>
                {activity.isHost && (
                  <Label
                    basic
                    content="you are hosting this activity"
                    color="orange"
                  />
                )} 
                 {activity.isGoing && !activity.isHost &&(
                  <Label
                    basic
                    content="you are going to this activity"
                    color="green"
                  />
                )}
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" />
          {format(activity.date!, "dd MMM yyyy h:mm aa")}
          <Icon name="marker" />
          {activity.venue}
        </span>
      </Segment>
      <Segment secondary>
        <ActivityListItemAttendee attendees={activity.attendees!} />
      </Segment>
      <Segment clearing>
        <span>
          {activity.description}
          <Button
            as={Link}
            to={`/activities/${activity.id}`}
            floated="right"
            content="View"
            color="blue"
          ></Button>
        </span>
      </Segment>
    </Segment.Group>
  );
}

export default ActivityListItem;
