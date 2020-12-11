import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import AddContact from './components/AddContact';
import { ContactsProvider } from './state/Contacts';

function App() {
  return (
    <ContactsProvider>
      <AddContact />
    </ContactsProvider>
  );
}

export default App;
