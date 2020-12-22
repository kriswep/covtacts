import React, { useState } from 'react';
import styled from 'styled-components/macro';

import { useContact } from '../state/Contacts';
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
          <h2>COVTACTS</h2>
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
          <h1>Help stop COVID-19 by tracing your contacts.</h1>
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
            Covtacts makes it easy to track who you had contact with. So you can
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

const Layout = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;
  /* grid-template-columns: 1fr 1fr; */
  grid-template-areas:
    'main'
    'side';

  @media (min-width: 50em) {
    grid-template-columns: minmax(auto, 30rem) 1fr;
    grid-template-areas: 'main side';
  }

  @media (min-width: 80em) {
    grid-template-columns: minmax(auto, 40rem) 1fr;
  }

  @media (min-width: 120em) {
    grid-template-columns: minmax(auto, 50rem) 1fr;
  }
`;

const Main = styled.section`
  grid-area: main;
  border-radius: 0 0 2.5rem 2.5rem;
  background-color: var(--main-bg-color-500);
  color: var(--main-text-color-800);
  padding: 1rem;

  @media (min-width: 38.75em) {
    padding: 3.75rem;
  }

  @media (min-width: 50em) {
    border-radius: 0 2.5rem 2.5rem 0;
    min-height: 100vh;
  }

  @media (min-width: 80em) {
    padding: 3.75rem 6rem;
  }

  @media (min-width: 120em) {
    padding: 3.75rem 10rem;
  }

  h2 {
    margin: 0 0 4.375rem 0;
    font-weight: 800;
    font-size: 1.5rem;
    line-height: 2rem;
  }

  p {
    margin: 0 0 4.375rem 0;
    font-size: 1.125rem;
    line-height: 1.5rem;
  }
`;

const Side = styled.section`
  grid-area: side;
  background-color: var(--main-bg-color-800);
  color: var(--main-text-color-200);
  padding: 1rem;

  @media (min-width: 38.75em) {
    padding: 3.75rem;
  }

  @media (min-width: 50em) {
    min-height: 100vh;
  }

  @media (min-width: 80em) {
    padding: 3.75rem 6rem;
  }

  @media (min-width: 120em) {
    padding: 3.75rem 10rem;
  }

  h1 {
    margin: 0 0 4.375rem 0;
    font-weight: 800;
    font-size: 2.25rem;
    line-height: 3rem;
  }
`;

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
