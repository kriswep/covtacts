import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

import { useContact } from './state/Contacts';
import AddContact from './components/AddContact';
import ContactsList from './components/ContactsList';
import LastDays from './screens/LastDays';

import Textfield from './components/Textfield';
import Button from './components/Button';

function Router() {
  const { contacts } = useContact();

  if (contacts.unauthenticated) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    );
  } else {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Contacts />}>
            <Route path="/" element={<LastDays />} />
            <Route path=":slug" element={<ContactsList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

const Contacts = () => {
  return (
    <>
      <AddContact />
      <Outlet />
    </>
  );
};

const Login = () => {
  const { dispatchContact, contacts } = useContact();
  const [password, setPassword] = useState('');

  return (
    <section>
      <header>
        <h2>Add a new contact</h2>
      </header>
      {contacts.error.length > 0 && <p>{contacts.error}</p>}
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
        />
        <div>
          <Button type="submit">Decrypt</Button>
        </div>
      </form>
    </section>
  );
};

export default Router;
