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
          <h1>COVTACTS</h1>
        </header>
        <p>Log with whom you had contact to minimise the COVID-19 spreading.</p>
        <p>
          Enter your password below, since we’ll store your contacts securely
          encrypted, right on your device.
        </p>
        <Login />
      </Main>
      <Side>
        <p>
          COVID-19 keeps spreading, mostly through air by people near each
          other. Social distancing and self-isolation is important, and should
          be done as much as possiple. But sometimes, you need to have close
          contact with some people for several reasons.
        </p>
        <p>
          Covtacts makes it easy to track who you had contact with. So you can
          inform them, if needs be, and stop the spreading through
          self-isolation.
        </p>
        <p>Help end this pandemic.</p>
        <p>
          Covtacts stores the contacts you entered securely and encrypted on
          your device. For that, we need a password.
        </p>
      </Side>
    </Layout>
  );
};

const Layout = styled.section`
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

const Main = styled.div`
  grid-area: main;
  background-color: var(--main-bg-color-500);
  border-radius: 0 0 2.5rem 2.5rem;
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

  h1 {
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

const Side = styled.div`
  grid-area: side;
  min-height: 100vh;
`;

export default Home;
