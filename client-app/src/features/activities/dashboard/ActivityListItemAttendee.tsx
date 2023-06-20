import React from "react";
import { Profile } from "../../../app/models/profile";
import { Image, List, ListItem, Popup } from "semantic-ui-react";
import { Link } from "react-router-dom";
import ProfileCard from "../../profile/ProfileCard";

interface Props {
  attendees: Profile[];
}

function ActivityListItemAttendee({ attendees }: Props) {
  return (
    <List horizontal>
      {attendees.map((attendee) => (
        <Popup
          hoverable
          key={attendee.username}
          trigger={
            <ListItem
              key={attendee.username}
              as={Link}
              to={`profiles/${attendee.username}`}
            >
              <Image
                circular
                size="mini"
                src={attendee.image || "/assets/user.png"}
              ></Image>
            </ListItem>
          }
        >
          <Popup.Content>
            <ProfileCard profile={attendee}></ProfileCard>
          </Popup.Content>

        </Popup>
      ))}
    </List>
  );
}

export default ActivityListItemAttendee;
