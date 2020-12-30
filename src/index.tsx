import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { MatomoProvider, createInstance } from '@datapunt/matomo-tracker-react';
import 'fontsource-nunito';
import 'fontsource-nunito/900-normal.css';
import './index.css';
import App from './App';
import './i18n';
import * as serviceWorker from './serviceWorker';

const instance = createInstance({
  urlBase: 'https://matomo.wetainment.com/',
  siteId: 3,
  // trackerUrl: '${urlBase}matomo.php', // optional, default value: `${urlBase}matomo.php`
  // srcUrl: '${urlBase}matomo.js', // optional, default value: `${urlBase}matomo.js`
  disabled: !(process.env.NODE_ENV === 'production'), // optional, false by default. Makes all tracking calls no-ops if set to true.
  heartBeat: {
    // optional, enabled by default
    active: false, // optional, default value: true
    // seconds: 10, // optional, default value: `15
  },
  // linkTracking: false, // optional, default value: true
  configurations: {
    // optional, default value: {}
    // any valid matomo configuration, all below are optional
    disableCookies: true,
    // setSecureCookie: true,
    setRequestMethod: 'POST',
  },
});

ReactDOM.render(
  <React.StrictMode>
    <MatomoProvider value={instance}>
      <Suspense fallback="loading">
        <App />
      </Suspense>
    </MatomoProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
