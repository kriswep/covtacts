import React, { useState, useRef } from 'react';
import styled from 'styled-components/macro';
import { useTextField } from '@react-aria/textfield';
import { useButton } from '@react-aria/button';
import { AriaTextFieldProps } from '@react-types/textfield';
import { AriaButtonProps } from '@react-types/button';
import DatePicker from 'react-datepicker';

import { useContact } from '../state/Contacts';

const AddContact = () => {
  const [personName, setPersonName] = useState('');
  const [date, setDate] = useState(new Date());
  const [contacts, dispatchContact] = useContact();

  const saveContact = () => {
    dispatchContact({
      type: 'addContact',
      payload: {
        key: new Date().toISOString(),
        date: new Date(date?.valueOf()),
        name: personName,
      },
    });
  };

  return (
    <>
      <Textfield label="The name" value={personName} onChange={setPersonName} />
      <DateInput label="The date" date={date} setDate={setDate} />
      <div>
        <SubmitButton type="submit" onPress={saveContact}>
          Save
        </SubmitButton>
      </div>
      <p>{JSON.stringify(contacts)}</p>
    </>
  );
};

const Textfield = (props: AriaTextFieldProps) => {
  const { label } = props;
  const ref = useRef<HTMLInputElement>(null);
  const { labelProps, inputProps } = useTextField(props, ref);

  return (
    <Field>
      <Label {...labelProps}>{label}</Label>
      <Input {...inputProps} ref={ref} />
    </Field>
  );
};

const Field = styled.div`
  display: flex;
  flex-direction: column;
`;
const Label = styled.label``;
const Input = styled.input``;

type DateInputProp = {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
};

const DateInput = (props: AriaTextFieldProps & DateInputProp) => {
  //   const [date, setDate] = useState(new Date());
  return (
    <DatePicker
      selected={props.date}
      onChange={(date) => {
        if (date && !Array.isArray(date)) props.setDate(date);
      }}
      customInput={<Textfield {...props} />}
    />
  );
};

const Button = styled.button``;
const SubmitButton = (props: AriaButtonProps) => {
  let ref = useRef<HTMLButtonElement>(null);
  let { buttonProps } = useButton(props, ref);
  let { children } = props;

  return (
    <Button {...buttonProps} ref={ref}>
      {children}
    </Button>
  );
};

export default AddContact;
