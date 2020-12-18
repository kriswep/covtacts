import React, { useState } from 'react';
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
        <Textfield
          type="password"
          label="Your password"
          value={password}
          onChange={setPassword}
          required
        />
        <div>
          <Button type="submit">Decrypt</Button>
        </div>
      </form>
    </>
  );
};

const Home = () => {
  return (
    <section>
      <header>
        <h2>Covtacts</h2>
      </header>

      <header>
        <h1>Trace your contacts</h1>
      </header>
      <p>
        COVID-19 keeps spreading, mostly through air by people near each other.
        Social distancing and self-isolation is important, and should be done as
        much as possiple. But sometimes, you need to have close contact with
        some people for several reasons.
      </p>
      <p>
        Covtacts makes it easy to track who you had contact with. So you can
        inform them, if needs be, and stop the spreading through self-isolation.
      </p>
      <p>Help end this pandemic.</p>
      <p>
        Covtacts stores the contacts you entered securely and encrypted on your
        device. For that, we need a password.
      </p>
      <Login />
    </section>
  );
};

export default Home;
