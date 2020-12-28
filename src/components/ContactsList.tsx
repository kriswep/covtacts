import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components/macro';

import { useContact } from '../state/Contacts';
import { Card, CardWrapper } from './Card';
import Empty from '../svg/Empty';

const ContactsList = () => {
  const { contacts, dispatchContact } = useContact();
  const { slug } = useParams();

  let [relevantContacts, setRelevantContacts] = useState(contacts.contacts);
  useEffect(() => {
    switch (slug) {
      case 'today':
        setRelevantContacts(contacts.contactsToday);
        break;
      case 'yesterday':
        setRelevantContacts(contacts.contactsYesterday);
        break;
      case 'last-seven-days':
        setRelevantContacts(contacts.contactsLastSevenDays);
        break;
      case 'last-fourteen-days':
        setRelevantContacts(contacts.contactsLastFourteenDays);
        break;
      case 'older':
        setRelevantContacts(contacts.contactsOlder);
        break;
      case 'all':
        setRelevantContacts(contacts.contacts);
        break;
      default:
        setRelevantContacts(contacts.contacts);
        break;
    }
  }, [
    slug,
    contacts.contactsToday,
    contacts.contactsYesterday,
    contacts.contactsLastSevenDays,
    contacts.contactsLastFourteenDays,
    contacts.contactsOlder,
    contacts.contacts,
  ]);

  const removeContact = (contactKey: string) => {
    dispatchContact({ type: 'removeContact', payload: { contactKey } });
  };

  if (contacts.loading) {
    return (
      <Section>
        <header>
          <h2>Your contacts</h2>
        </header>
        <p>Loading...</p>
      </Section>
    );
  }

  return (
    <Section>
      <header>
        <h2>Your contacts</h2>
      </header>
      {relevantContacts.length <= 0 && (
        <div>
          {contacts.contacts.length > 0 ? (
            <>
              <p>No contacts for this period.</p>
              <Empty width="100%" height="auto" />
              <p>Did you miss someone? No worries, you can add them now.</p>
            </>
          ) : (
            <>
              <p>No contacts yet.</p>
              <Empty width="100%" height="auto" />
              <p>Start by adding the contacts you had.</p>
            </>
          )}
        </div>
      )}
      <CardWrapper>
        {relevantContacts.map((contact) => {
          return (
            <Card
              key={contact.key}
              title={contact.name}
              aside={contact.date.toLocaleDateString()}
              removeAction={(_e) => removeContact(contact.key)}
            />
          );
        })}
      </CardWrapper>
    </Section>
  );
};

const Section = styled.section`
  p {
    margin: 1rem 0 1rem 0;
  }
`;

export default ContactsList;
