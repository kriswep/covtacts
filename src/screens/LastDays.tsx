import React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';

import { useContact } from '../state/Contacts';
import { LinkCard as Card, CardWrapper } from '../components/Card';
import Empty from '../svg/Empty';

const LastDays = () => {
  const { contacts } = useContact();
  const { t } = useTranslation();

  if (contacts.loading) {
    return (
      <Section>
        <header>
          <h2>{t('contacts.title')}</h2>
        </header>
        <p>{t('loading')}</p>
      </Section>
    );
  }

  return (
    <Section>
      <header>
        <h2>{t('contacts.title')}</h2>
      </header>
      {contacts.contacts.length <= 0 ? (
        <>
          <p>{t('contacts.noContact1')}</p>
          <Empty width="100%" height="auto" />
          <p>{t('contacts.noContact2')}</p>
        </>
      ) : (
        <CardWrapper>
          <Card
            key="contactsToday"
            title={t('contacts.period.today')}
            aside={`${contacts.contactsToday.length}`}
            linkTo="today"
          />
          <Card
            key="contactsYesterday"
            title={t('contacts.period.yesterday')}
            aside={`${contacts.contactsYesterday.length}`}
            linkTo="yesterday"
          />
          <Card
            key="contactsLastSevenDays"
            title={t('contacts.period.last7')}
            aside={`${contacts.contactsLastSevenDays.length}`}
            linkTo="last-seven-days"
          />
          <Card
            key="contactsLastFourteenDays"
            title={t('contacts.period.last14')}
            aside={`${contacts.contactsLastFourteenDays.length}`}
            linkTo="last-fourteen-days"
          />
          <Card
            key="contactsOlder"
            title={t('contacts.period.older')}
            aside={`${contacts.contactsOlder.length}`}
            linkTo="older"
          />
          <Card
            key="contactsAll"
            title={t('contacts.period.all')}
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
