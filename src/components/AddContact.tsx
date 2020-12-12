import React, { useState, useRef } from 'react';
// import styled from 'styled-components/macro';

import Textfield from './Textfield';
import DatePicker from './DatePicker';
import Button from './Button';
import { useContact } from '../state/Contacts';

const AddContact = () => {
  const [personName, setPersonName] = useState('');
  const [date, setDate] = useState(new Date());
  const { dispatchContact } = useContact();

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
    <section>
      <header>
        <h2>Add a new contact</h2>
      </header>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          saveContact();
        }}
      >
        <Textfield
          label="The name"
          value={personName}
          onChange={setPersonName}
        />
        <DatePicker label="The date" date={date} setDate={setDate} />
        <div>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </section>
  );
};

export default AddContact;
