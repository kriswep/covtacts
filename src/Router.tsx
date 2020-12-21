import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

import { useContact } from './state/Contacts';
import Home from './screens/Home';
import AddContact from './components/AddContact';
import ContactsList from './components/ContactsList';
import LastDays from './screens/LastDays';

function Router() {
  const { contacts } = useContact();

  if (contacts.unauthenticated) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path=":slug" element={<Home />} />
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

export default Router;
