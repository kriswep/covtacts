import React from 'react';

import { useContact } from '../state/Contacts';
import { LinkCard as Card, CardWrapper } from '../components/Card';

const LastDays = () => {
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
    </section>
  );
};

export default LastDays;
