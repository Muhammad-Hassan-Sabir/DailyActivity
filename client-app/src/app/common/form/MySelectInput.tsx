import { Form, useField } from 'formik';
import React from 'react'
import { FormField, Label, Select } from 'semantic-ui-react';

interface Props{
    name:string;
    options:any;
    placeholder:string;
    label?:string
}



function MySelectInput(props:Props) {

    const [field,meta,helpers]=useField(props.name)

  return (
    <FormField error={meta.touched && !!meta.error}>
        <label>{props.label}</label>
        <Select
        clearable
        options={props.options}
        value={field.value||null}
        onChange={(e,d)=>helpers.setValue(d.value)}
        onBlur={()=>helpers.setTouched(true)}
        placeholder={props.placeholder}
        />
        {meta.touched && meta.error ? (
            <Label basic color='red' >{meta.error}</Label>
        ):null}
    </FormField>

    )
}

export default MySelectInput