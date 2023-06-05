import { ErrorMessage, Formik } from "formik";
import React from "react";
import { Button, Form, Header, Label } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { log } from "console";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";

function LoginForm() {
  const { userStore } = useStore();

  return (
    <Formik
      initialValues={{ email: "", password: "", error: null }}
      onSubmit={(values, { setErrors }) =>
        userStore
          .login(values)
          .catch(error => setErrors({error:"Invalid email or password"}))
      }
    >
      {({ handleSubmit, isSubmitting, errors }) => (
        <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
          <Header as="h2"  content="Login to Daily Activity" color="teal" textAlign="center"></Header>
          <MyTextInput name="email" placeholder="Email"></MyTextInput>
          <MyTextInput
            name="password"
            placeholder="Password"
            type="password"
          ></MyTextInput>
          <ErrorMessage
            name="error"
            render={() => 
              <Label
                content={errors.error}
                color="red"
                style={{ marginBottom: 10 }}
                basic
              ></Label>
            }
          ></ErrorMessage>

          <Button
            loading={isSubmitting}
            positive
            content="Login"
            fluid
            type="submit"
          ></Button>
        </Form>
      )}
    </Formik>
  );
}

export default observer(LoginForm);
