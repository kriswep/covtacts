import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';

import { useContact } from '../state/Contacts';
import { Layout, Main, Side } from '../components/Layout';
import Textfield from '../components/Textfield';
import Button from '../components/Button';

const Login = () => {
  const { dispatchContact, contacts } = useContact();
  const [password, setPassword] = useState('');
  const { t } = useTranslation();

  return (
    <>
      {contacts.error.length > 0 && <p>Oh no! {contacts.error}</p>}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatchContact({
            type: 'setPassword',
            payload: {
              password,
            },
          });
        }}
      >
        <Fieldset>
          <Textfield
            type="password"
            label={t('password')}
            value={password}
            // onChange={setPassword}
            onChange={(event) => {
              setPassword(event.currentTarget.value);
            }}
            required
          />
          <ButtonContainer>
            <Button type="submit">{t('decrypt')}</Button>
          </ButtonContainer>
        </Fieldset>
      </form>
    </>
  );
};

const Fieldset = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (min-width: 28em) {
    flex-direction: row;
    align-items: flex-end;
    gap: 1.125rem;
  }
`;

const ButtonContainer = styled.div`
  margin: 1.125rem 0 0 0;
`;

const Home = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <Main>
        <header>
          <h2>COVTACT</h2>
        </header>
        <p>{t('hero.paragraph1')}</p>
        <p>{t('hero.paragraph2')}</p>
        <Login />
      </Main>
      <Side>
        <header>
          <h1>{t('side.title')}</h1>
        </header>
        <FeatureBlock>
          <h2>{t('side.featureBlock1.title')}</h2>
          <p>{t('side.featureBlock1.paragraph')}</p>
        </FeatureBlock>
        <FeatureBlock>
          <h2>{t('side.featureBlock2.title')}</h2>
          <p>{t('side.featureBlock2.paragraph')}</p>
        </FeatureBlock>
      </Side>
    </Layout>
  );
};

const FeatureBlock = styled.div`
  margin: 0 0 4.375rem 0;

  &:last-child {
    margin-bottom: 0;
  }

  h2 {
    margin: 0 0 2rem 0;
    font-weight: 400;
    font-size: 1.5rem;
    line-height: 2rem;
  }

  p {
    margin: 0;
    font-size: 1.125rem;
    line-height: 1.5rem;
  }
`;

export default Home;
