import React, { useState } from 'react';
import styled from 'styled-components/macro';

import NameSuggestField from './NameSuggestField';
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
        <NameSuggestField
          value={personName}
          setValue={setPersonName}
          label="With whom did you have contact?"
          required
        />
        <DatePicker
          label="When did you have contact?"
          date={date}
          setDate={setDate}
          required
        />
        <ButtonContainer>
          <Button type="submit">Save</Button>
        </ButtonContainer>
      </form>
    </section>
  );
};

const ButtonContainer = styled.div`
  margin: 1.125rem 0 0 0;
`;

export default AddContact;
