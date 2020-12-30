import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';

import NameSuggestField from './NameSuggestField';
import DatePicker from './DatePicker';
import Button from './Button';
import { useContact } from '../state/Contacts';

const AddContact = () => {
  const [personName, setPersonName] = useState('');
  const [date, setDate] = useState(new Date());
  const { dispatchContact } = useContact();
  const { t } = useTranslation();

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
        <h2>{t('contactAdd.title')}</h2>
      </header>
      <p>{t('contactAdd.paragraph')}</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          saveContact();
        }}
      >
        <NameSuggestField
          value={personName}
          setValue={setPersonName}
          label={t('contactAdd.nameLabel')}
          required
        />
        <DatePicker
          label={t('contactAdd.dateLabel')}
          date={date}
          setDate={setDate}
          required
        />
        <ButtonContainer>
          <Button type="submit">{t('contactAdd.saveButton')}</Button>
        </ButtonContainer>
      </form>
    </section>
  );
};

const ButtonContainer = styled.div`
  margin: 1.125rem 0 0 0;
`;

export default AddContact;
