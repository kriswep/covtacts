import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { OverlayProvider } from '@react-aria/overlays';
import styled from 'styled-components/macro';
import { useMatomo } from '@datapunt/matomo-tracker-react';

import { ContactsProvider } from './state/Contacts';
import Router from './Router';

function App() {
  const { trackPageView } = useMatomo();

  // Track page view
  React.useEffect(() => {
    trackPageView({});
  }, []);

  return (
    <ContactsProvider>
      <OverlayProvider>
        <AppWrapper>
          <Main>
            <Router />
          </Main>
        </AppWrapper>
      </OverlayProvider>
    </ContactsProvider>
  );
}

const AppWrapper = styled.div`
  display: flex;
  > div {
    flex: 1;
  }
`;

const Main = styled.div``;

export default App;
