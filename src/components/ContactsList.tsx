import React from 'react';
import styled from 'styled-components/macro';

import { useContact } from '../state/Contacts';
import { Card, CardWrapper } from './Card';

const ContactsList = () => {
  const { contacts } = useContact();

  if (contacts.loading) {
    return (
      <section>
        <header>
          <h2>Your contacts</h2>
        </header>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section>
      <header>
        <h2>Your contacts</h2>
      </header>
      <CardWrapper>
        {contacts.contacts.map((contact) => {
          return (
            <Card
              key={contact.key}
              title={contact.name}
              aside={contact.date.toLocaleDateString()}
            />
          );
        })}
      </CardWrapper>
    </section>
  );
};

const ContactWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  > div {
    flex: 1 1 15rem;
    flex: 1 1 clamp(10rem, 30vw + 5rem, 18rem);
    background-color: #fff;
    border-radius: 1rem;
    padding: 0.5rem;
  }
  p {
    margin-block-start: 0;
    margin-block-end: 0.5rem;
  }
`;

export default ContactsList;
