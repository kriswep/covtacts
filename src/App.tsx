import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { OverlayProvider } from '@react-aria/overlays';
import styled from 'styled-components/macro';

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
            <AddContact />
            <ContactsList />
            <LastDays />
          </div>
        </AppWrapper>
      </OverlayProvider>
    </ContactsProvider>
  );
}

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
