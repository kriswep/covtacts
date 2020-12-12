import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { OverlayProvider } from '@react-aria/overlays';
import styled from 'styled-components/macro';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom';

import { ContactsProvider } from './state/Contacts';
import AddContact from './components/AddContact';
import ContactsList from './components/ContactsList';
import LastDays from './screens/LastDays';

function App() {
  return (
    <ContactsProvider>
      <OverlayProvider>
        <AppWrapper>
          <div>
            <Router>
              <Routes>
                <Route path="/" element={<Contacts />}>
                  <Route path="/" element={<LastDays />} />
                  <Route path=":slug" element={<ContactsList />} />
                </Route>
              </Routes>
            </Router>
          </div>
        </AppWrapper>
      </OverlayProvider>
    </ContactsProvider>
  );
}

const Contacts = () => {
  return (
    <>
      <AddContact />
      <Outlet />
    </>
  );
};

const AppWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem;
  > div {
    flex: 1;
    max-width: 64rem;
  }
`;

export default App;
