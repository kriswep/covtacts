import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { OverlayProvider } from '@react-aria/overlays';
import styled from 'styled-components/macro';

import { ContactsProvider } from './state/Contacts';
import Router from './Router';

function App() {
  return (
    <ContactsProvider>
      <OverlayProvider>
        <AppWrapper>
          <div>
            <Router />
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
