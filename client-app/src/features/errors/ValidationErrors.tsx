import React from "react";
import { Message, MessageList } from "semantic-ui-react";

interface Props {
  errors: string[]|null;
}

function ValidationErrors({ errors }: Props) {
  return (
    <Message error>
      {errors && (
        <MessageList>
          {errors.map((err, i) => (
            <Message.Item key={i}>{err}</Message.Item>
          ))}
        </MessageList>
      )}
    </Message>
  );
}

export default ValidationErrors;
