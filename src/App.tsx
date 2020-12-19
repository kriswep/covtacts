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
          <Header>
            <h2>COVTACTS</h2>
          </Header>
          <Main>
            <Router />
          </Main>
          <Footer>
            <p>Made with ❤️</p>
          </Footer>
        </AppWrapper>
      </OverlayProvider>
    </ContactsProvider>
  );
}

const AppWrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 1fr fit-content(64rem) 1fr;
  grid-template-columns: 1fr minmax(auto, 64rem) 1fr;
  grid-template-areas:
    'b header a'
    'b main a'
    'b footer a';
  padding: 1rem;
  min-height: 100vh;
  /* background-image: linear-gradient(
    to right,
    #4d375c,
    #8c416e,
    #cb4c67,
    #f56c49,
    #ffa10a
  ); */
`;

const Header = styled.header`
  grid-area: header;
`;
const Main = styled.div`
  grid-area: main;
`;

const Footer = styled.footer`
  grid-area: footer;
`;

export default App;
