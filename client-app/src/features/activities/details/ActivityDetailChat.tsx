import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import {
  Segment,
  Header,
  Comment,
  Form,
  Button,
  Label,
} from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { format } from "date-fns";
interface Props {
  activityId: string;
}
export default observer(function ActivityDetailChat({ activityId }: Props) {
  const { commentStore } = useStore();
  const { comments } = commentStore;
  useEffect(() => {
    if (activityId) {
      commentStore.createHubConnection(activityId);
    }

    return () => {
      commentStore.clearComments();
    };
  }, [commentStore, activityId]);
  return (
    <>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{ border: "none" }}
      >
        <Header>Chat about this event</Header>
      </Segment>
      <Segment attached>
        <Comment.Group>
          {comments.length === 0 ? (
            <Segment textAlign="center">
              <Label basic content="No comments yet" />
            </Segment>
          ) : (
            comments.map((comment) => (
              <Comment>
                <Comment.Avatar src={comment.image || "/assets/user.png"} />
                <Comment.Content>
                  <Comment.Author as="a">{comment.displayName}</Comment.Author>
                  <Comment.Metadata>
                    <div>{format(comment.createdAt, "MMM d, yyyy h:mm a")}</div>
                  </Comment.Metadata>
                  <Comment.Text>{comment.message}</Comment.Text>
                  <Comment.Actions>
                    <Comment.Action>Reply</Comment.Action>
                  </Comment.Actions>
                </Comment.Content>
              </Comment>
            ))
          )}

          {/* <Comment>
                        <Comment.Avatar src='/assets/user.png'/>
                        <Comment.Content>
                            <Comment.Author as='a'>Joe Henderson</Comment.Author>
                            <Comment.Metadata>
                                <div>5 days ago</div>
                            </Comment.Metadata>
                            <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
                            <Comment.Actions>
                                <Comment.Action>Reply</Comment.Action>
                            </Comment.Actions>
                        </Comment.Content>
                    </Comment> */}

          <Form reply>
            <Form.TextArea />
            <Button
              content="Add Reply"
              labelPosition="left"
              icon="edit"
              primary
            />
          </Form>
        </Comment.Group>
      </Segment>
    </>
  );
});
