import React, { useState } from "react";
import { Profile, EditProfileFormValues } from "../../../app/models/profile";
import { Button, Form, Segment } from "semantic-ui-react";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useStore } from "../../../app/stores/store";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";
interface Props {
  profile: Profile | null;
  setEditMode: (editMode: boolean) => void;
}
function EditProfileForm({ profile, setEditMode }: Props) {
  const { profileStore } = useStore();
  const {updateProfileAbout}=profileStore;
  const history = useHistory();
  const [editProfileFormValues, setEditProfileFormValues] =
    useState<EditProfileFormValues>(new EditProfileFormValues(profile));
  const validationSchema = Yup.object({
    displayName: Yup.string().required(),
    bio: Yup.string().max(500),
  });
  const handleSubmit =async (values: EditProfileFormValues) => {
   await updateProfileAbout(values);
    // .then(()=>{
    //   history.push(`/profiles/${profile?.username}`)
    // })
    setEditMode(false);
  };

  return (
    <Segment clearing>
      <Formik
        initialValues={editProfileFormValues}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
        enableReinitialize
      >
        {({ handleSubmit, isValid, dirty, isSubmitting }) => (
          <Form className="ui form" autoComplete="off" onSubmit={handleSubmit}>
            <MyTextInput
              name="displayName"
              placeholder="Display Name"
            ></MyTextInput>
            <MyTextArea row={2} name="bio" placeholder="bio"></MyTextArea>
            <Button
              disabled={isSubmitting || !dirty || !isValid}
              loading={isSubmitting}
              floated="right"
              type="submit"
              positive
              content="Submit"
            ></Button>
          </Form>
        )}
      </Formik>
    </Segment>
  );
}

export default observer(EditProfileForm);
