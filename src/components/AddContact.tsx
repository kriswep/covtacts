import React, { useState } from 'react';
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
    setPersonName('');
  };

  return (
    <section>
      <header>
        <h2>Add a new contact</h2>
      </header>
      <p>You had close contact with somebody? Log that.</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          saveContact();
        }}
      >
        <Textfield
          label="With whom did you have contact?"
          value={personName}
          onChange={setPersonName}
          required
        />
        <DatePicker
          label="When did you have contact?"
          date={date}
          setDate={setDate}
          required
        />
        <div>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </section>
  );
};

export default AddContact;
