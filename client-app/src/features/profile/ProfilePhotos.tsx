import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Profile } from "../../app/models/profile";
import {
  Tab,
  Image,
  Header,
  CardGroup,
  Card,
  Button,
  Segment,
  Grid,
} from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import PhotoUploadWidget from "../../app/common/imageUpload/PhotoUploadWidget";
interface Props {
  profile: Profile | null;
}
function ProfilePhotos({ profile }: Props) {
  const {
    profileStore: { isCurrentUser },
  } = useStore();
  const [addPhotoMode, setAddPhotoMode] = useState(false);
  return (
    <Tab.Pane>
      <Grid>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header icon="image" content="Photos"></Header>
          </Grid.Column>
          {isCurrentUser && (
            <Grid.Column width={8} textAlign="right">
              <Button
                content={addPhotoMode ? "Cancel" : "Upload Photo"}
                onClick={() => setAddPhotoMode(!addPhotoMode)}
              ></Button>
            </Grid.Column>
          )}
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            {addPhotoMode ? (
              <PhotoUploadWidget />
            ) : (
              <CardGroup itemsPerRow={5}>
                {profile?.photos?.map((p) => (
                  <Card key={p.id}>
                    <Image src={p.url} />
                  </Card>
                ))}
              </CardGroup>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Tab.Pane>
  );
}

export default observer(ProfilePhotos);
