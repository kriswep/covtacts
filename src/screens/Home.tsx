import React, { useState } from 'react';
import styled from 'styled-components/macro';

import { useContact } from '../state/Contacts';
import { Layout, Main, Side } from '../components/Layout';
import Textfield from '../components/Textfield';
import Button from '../components/Button';

const Login = () => {
  const { dispatchContact, contacts } = useContact();
  const [password, setPassword] = useState('');

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
            label="Password"
            value={password}
            // onChange={setPassword}
            onChange={(event) => {
              setPassword(event.currentTarget.value);
            }}
            required
          />
          <div>
            <Button type="submit">Decrypt</Button>
          </div>
        </Fieldset>
      </form>
    </>
  );
};

const Fieldset = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.125rem;

  @media (min-width: 23.4em) {
    flex-direction: row;
    align-items: flex-end;
  }
`;

const Home = () => {
  return (
    <Layout>
      <Main>
        <header>
          <h2>COVTACT</h2>
        </header>
        <p>Log with whom you had contact to minimise the COVID-19 spreading.</p>
        <p>
          Enter your password below, since we’ll store your contacts securely
          encrypted, right on your device.
        </p>
        <Login />
      </Main>
      <Side>
        <header>
          <h1>Help stop COVID-19 by knowing your contacts.</h1>
        </header>
        {/* <p>
          COVID-19 keeps spreading, mostly through air by people near each
          other. Social distancing and self-isolation is important, and should
          be done as much as possiple. But sometimes, you need to have close
          contact with some people for several reasons.
        </p> */}
        <FeatureBlock>
          <h2>FAST AND SIMPLE</h2>
          <p>
            Covtact makes it easy to track who you had contact with. So you can
            inform them, if needs be, and stop the spreading through
            self-isolation.
          </p>
        </FeatureBlock>
        <FeatureBlock>
          <h2>PRIVATE BY DEFAULT</h2>
          <p>
            You log all contacts manually, deciding what's a close contact and
            what not. The contacts are stored encrypted right on your device. We
            don't send them anywhere, not even to our own servers. We simply
            can't see them!
          </p>
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
