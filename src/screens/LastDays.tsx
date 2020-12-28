import React from 'react';
import styled from 'styled-components/macro';

import { useContact } from '../state/Contacts';
import { LinkCard as Card, CardWrapper } from '../components/Card';
import Empty from '../svg/Empty';

const LastDays = () => {
  const { contacts } = useContact();

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
      {contacts.contacts.length <= 0 ? (
        <>
          <p>No contacts yet.</p>
          <Empty width="100%" height="auto" />
          <p>Start by adding the contacts you had.</p>
        </>
      ) : (
        <CardWrapper>
          <Card
            key="contactsToday"
            title="Today"
            aside={`${contacts.contactsToday.length}`}
            linkTo="today"
          />
          <Card
            key="contactsYesterday"
            title="Yesterday"
            aside={`${contacts.contactsYesterday.length}`}
            linkTo="yesterday"
          />
          <Card
            key="contactsLastSevenDays"
            title="Last 7 Days"
            aside={`${contacts.contactsLastSevenDays.length}`}
            linkTo="last-seven-days"
          />
          <Card
            key="contactsLastFourteenDays"
            title="Last 14 Days"
            aside={`${contacts.contactsLastFourteenDays.length}`}
            linkTo="last-fourteen-days"
          />
          <Card
            key="contactsOlder"
            title="Older"
            aside={`${contacts.contactsOlder.length}`}
            linkTo="older"
          />
          <Card
            key="contactsAll"
            title="All"
            aside={`${contacts.contacts.length}`}
            linkTo="all"
          />
        </CardWrapper>
      )}
    </Section>
  );
};

const Section = styled.section`
  p {
    margin: 1rem 0 1rem 0;
  }
`;

export default LastDays;
