import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useContact } from '../state/Contacts';
import { Card, CardWrapper } from './Card';

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
    </section>
  );
};

export default ContactsList;
