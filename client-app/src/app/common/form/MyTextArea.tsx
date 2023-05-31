import { Form, useField } from 'formik';
import React from 'react'
import { FormField, Label } from 'semantic-ui-react';

interface Props{
    name:string;
    placeholder:string;
    row:number
    label?:string
}



function MyTextArea(props:Props) {

    const [field,meta]=useField(props.name)

  return (
    <FormField error={meta.touched && !!meta.error}>
        <label>{props.label}</label>
        <textarea {...field} {...props}></textarea>
        {meta.touched && meta.error ? (
            <Label basic color='red' >{meta.error}</Label>
        ):null}
    </FormField>

    )
}

export default MyTextArea