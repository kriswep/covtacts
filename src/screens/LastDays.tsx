import React from 'react';
import isToday from 'date-fns/isToday';
import isYesterday from 'date-fns/isYesterday';
import startOfToday from 'date-fns/startOfToday';
import endOfToday from 'date-fns/endOfToday';
import subDays from 'date-fns/subDays';
import isWithinInterval from 'date-fns/isWithinInterval';
import isBefore from 'date-fns/isBefore';

import { useContact } from '../state/Contacts';
import { Card, CardWrapper } from '../components/Card';

const LastDays = () => {
  const { contacts } = useContact();

  const contactsToday = contacts.contacts.filter((contact) =>
    isToday(contact.date),
  );
  const contactsYesterday = contacts.contacts.filter((contact) =>
    isYesterday(contact.date),
  );
  const lastSevenDaysInterval = {
    start: subDays(startOfToday(), 7),
    end: subDays(endOfToday(), 2),
  };
  const contactsLastSevenDays = contacts.contacts.filter((contact) =>
    isWithinInterval(contact.date, lastSevenDaysInterval),
  );
  const lastFourteenDaysInterval = {
    start: subDays(startOfToday(), 14),
    end: subDays(endOfToday(), 8),
  };
  const contactsLastFourteenDays = contacts.contacts.filter((contact) =>
    isWithinInterval(contact.date, lastFourteenDaysInterval),
  );
  const older = subDays(endOfToday(), 15);
  const contactsOlder = contacts.contacts.filter((contact) =>
    isBefore(contact.date, older),
  );

  return (
    <section>
      <header>
        <h2>Your contacts</h2>
      </header>
      <CardWrapper>
        <Card
          key="contactsToday"
          title="Today"
          aside={`${contactsToday.length}`}
        />
        <Card
          key="contactsYesterday"
          title="Yesterday"
          aside={`${contactsYesterday.length}`}
        />
        <Card
          key="contactsLastSevenDays"
          title="Last 7 Days"
          aside={`${contactsLastSevenDays.length}`}
        />
        <Card
          key="contactsLastFourteenDays"
          title="Last 14 Days"
          aside={`${contactsLastFourteenDays.length}`}
        />
        <Card
          key="contactsOlder"
          title="Older"
          aside={`${contactsOlder.length}`}
        />
        <Card
          key="contactsAll"
          title="All"
          aside={`${contacts.contacts.length}`}
        />
      </CardWrapper>
      {/* <div>Today: {JSON.stringify(contactsToday)}</div>
      <div>Yesterday: {JSON.stringify(contactsYesterday)}</div>
      <div>Last 7 Days: {JSON.stringify(contactsLastSevenDays)}</div>
      <div>Last 14 Days: {JSON.stringify(contactsLastFourteenDays)}</div>
      <div>Older: {JSON.stringify(contactsOlder)}</div>
      <div>All: {JSON.stringify(contacts.contacts)}</div> */}
    </section>
  );
};

export default LastDays;
