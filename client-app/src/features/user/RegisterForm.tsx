import { ErrorMessage, Formik } from "formik";
import React from "react";
import { Button, Form, Header, Label } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { log } from "console";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import * as YUP from 'yup'
import ValidationErrors from "../errors/ValidationErrors";
function RegisterForm() {
  const { userStore } = useStore();

  return (
    <Formik
      initialValues={{ displayName:"",userName:"", email: "", password: "", error: null }}
      onSubmit={(values, { setErrors }) =>
        userStore
          .register(values)
          .catch(error => setErrors({error}))
      }
      validationSchema={YUP.object({
        displayName:YUP.string().required(),
        userName:YUP.string().required(),
        email:YUP.string().required().email(),
        password:YUP.string().required(),

      })}
    >
      {({ handleSubmit, isSubmitting, errors,isValid,dirty}) => (
        <Form className="ui form error" onSubmit={handleSubmit} autoComplete="off">
          <Header as="h2"  content="Sign up to Daily Activity" color="teal" textAlign="center"></Header>
          <MyTextInput name="displayName" placeholder="Display Name"></MyTextInput>
          <MyTextInput name="userName" placeholder="Username"></MyTextInput>
          <MyTextInput name="email" placeholder="Email"></MyTextInput>
          <MyTextInput
            name="password"
            placeholder="Password"
            type="password"
          ></MyTextInput>
          <ErrorMessage
            name="error"
            render={() => 
              <ValidationErrors
                errors={errors.error}
              ></ValidationErrors>
              
            }
          ></ErrorMessage>

          <Button
            loading={isSubmitting}
            positive
            content="Register"
            fluid
            type="submit"
            disabled={!dirty || !isValid || isSubmitting}
          ></Button>
        </Form>
      )}
    </Formik>
  );
}

export default observer(RegisterForm);
