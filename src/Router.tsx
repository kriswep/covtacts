import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useLocation,
} from 'react-router-dom';
import { useTransition, animated } from 'react-spring';

import { useContact } from './state/Contacts';
import { Layout, Main, Side } from './components/Layout';
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
          <Route
            path="/"
            element={
              <AnimatedComp>
                <Home />
              </AnimatedComp>
            }
          />
          <Route
            path=":slug"
            element={
              <AnimatedComp>
                <Home />
              </AnimatedComp>
            }
          />
        </Routes>
      </BrowserRouter>
    );
  } else {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Contacts />}>
            <Route
              path="/"
              element={
                <AnimatedComp>
                  <LastDays />
                </AnimatedComp>
              }
            />
            <Route
              path=":slug"
              element={
                <AnimatedComp>
                  <ContactsList />
                </AnimatedComp>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

const AnimatedComp = ({ children }: { children: React.ReactNode }): any => {
  const location = useLocation();

  const transitions = useTransition(location, (location) => location.pathname, {
    from: {
      opacity: 0,
      display: 'none',
    },
    enter: {
      opacity: 1,
      display: 'block',
    },
    leave: {
      opacity: 0,
      display: 'none',
    },
  });

  return transitions.map(({ item: _location, props, key }) => (
    <animated.div key={key} style={props} className="route-animation">
      {children}
    </animated.div>
  ));
};

const Contacts = () => {
  return (
    <Layout>
      <Main>
        <AddContact />
      </Main>
      <Side>
        <Outlet />
      </Side>
    </Layout>
  );
};

export default Router;
