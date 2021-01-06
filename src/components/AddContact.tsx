import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';

import NameSuggestField from './NameSuggestField';
import DatePicker from './DatePicker';
import Button from './Button';
import { useContact } from '../state/Contacts';
import MessageHub, { Item as MessageItem } from './MessageHub';

const AddContact = () => {
  const [personName, setPersonName] = useState('');
  const [date, setDate] = useState(new Date());
  const { dispatchContact } = useContact();
  const { t } = useTranslation();
  const [newMessage, setNewMessage] = useState<MessageItem>();

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
    <>
      <section>
        <header>
          <h2>{t('contactAdd.title')}</h2>
        </header>
        <p>{t('contactAdd.paragraph')}</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveContact();
            setNewMessage({ key: Date.now(), msg: t('contactAdd.success') });
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
      <MessageHub newMessage={newMessage} />
    </>
  );
};

const ButtonContainer = styled.div`
  margin: 1.125rem 0 0 0;
`;

export default AddContact;
