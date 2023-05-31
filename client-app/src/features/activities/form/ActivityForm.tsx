import { ChangeEvent, useEffect, useState } from "react";
import { Button, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useHistory, useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { Activity } from "../../../app/models/activity";
function ActivityForm() {
  const { activityStore } = useStore();
  const { loadingActivity, loading, createActivity, updateActivity } =
    activityStore;
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [activity, setActivity] = useState<Activity>({
    id: "",
    title: "",
    description: "",
    city: "",
    category: "",
    date: null,
    venue: "",
  });
  useEffect(() => {
    if (id) loadingActivity(id).then((activity) => setActivity(activity!));
  }, [id, loadingActivity]);
  const validationSchema = Yup.object({
    title: Yup.string().required("The activity is a required field"),
    description: Yup.string().required(),
    city:  Yup.string().required(),
    category:  Yup.string().required(),
    date:  Yup.string().required().nullable(),
    venue:  Yup.string().required()
  });

  // const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   const {name,value}=e.target;
  //   setActivity(values => ({...values, [name]: value}))
  // }
  const handleFormSubmit=(activity:Activity)=>{
    if (activity.id.length===0) {
      let newActivity={
        ...activity,id:uuid()
      }
      createActivity(newActivity).then(()=>history.push(`/activities/${newActivity.id}`))

    }
    else{
      updateActivity(activity).then(()=>history.push(`/activities/${activity.id}`))
    }
  }
  return (
    <>
      <Segment clearing>
        <Formik
          validationSchema={validationSchema}
          enableReinitialize
          initialValues={activity}
          onSubmit={(values) => handleFormSubmit(values)}
        >
          {({ handleSubmit,isValid,dirty,isSubmitting }) => (
            <Form className="ui form" autoComplete="off" onSubmit={handleSubmit}>
              <MyTextInput name="title" placeholder="Title"></MyTextInput>
              <MyTextArea row={3} name="description" placeholder="Description"></MyTextArea>
              <MySelectInput options={categoryOptions} name="category" placeholder="Category"></MySelectInput>
              <MyDateInput 
              name="date"
              placeholderText="Date"
              showTimeSelect
              timeCaption="time"
              dateFormat='MMMM d,yyyy h:mm aa'
              />
              <MyTextInput name="city" placeholder="City"></MyTextInput>
              <MyTextInput name="venue" placeholder="Venue"></MyTextInput>
              <Button
                disabled={isSubmitting || !dirty || !isValid }
                loading={loading}
                floated="right"
                type="submit"
                positive
                content="Submit"
              ></Button>
              <Button
                as={Link}
                to="/activities"
                floated="right"
                type="button"
                content="Cancel"
              ></Button>
            </Form>
          )}
        </Formik>
      </Segment>
    </>
  );
}
export default observer(ActivityForm);
