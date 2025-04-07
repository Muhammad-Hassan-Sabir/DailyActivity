import React from "react";
import {
  Button,
  Divider,
  Grid,
  GridColumn,
  Item,
  ItemGroup,
  Reveal,
  Segment,
  Statistic,
} from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
interface Props{
  profile:Profile|null
}
function ProfileHeader({profile}:Props) {
  return (
    <Segment>
      <Grid>
        <GridColumn width={12}>
          <ItemGroup>
            <Item>
              <Item.Image
                size="small"
                circular
                src={profile?.image||`/assets/user.png`}
              ></Item.Image>
              <Item.Content verticalAlign="middle">
                <Item.Header as="h1" content={profile?.displayName}></Item.Header>
              </Item.Content>
            </Item>
          </ItemGroup>
        </GridColumn>
        <GridColumn width={4}>
          <Statistic.Group>
            <Statistic label="Followers" value="5" />
            <Statistic label="Following" value="42" />
          </Statistic.Group>
          <Divider />
          <Reveal animated="move">
            <Reveal.Content visible style={{ width: "100%" }}>
              <Button fluid color="teal" content="Following"></Button>
            </Reveal.Content>
            <Reveal.Content hidden style={{ width: "100%" }}>
              <Button
                fluid
                basic
                color={true ? "red" : "green"}
                content={true ? "Unfollow" : "Follow"}
              ></Button>
            </Reveal.Content>
          </Reveal>
        </GridColumn>
      </Grid>
    </Segment>
  );
}

export default ProfileHeader;
