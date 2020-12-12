import React, { useMemo } from 'react';
import isToday from 'date-fns/isToday';
import isYesterday from 'date-fns/isYesterday';
import startOfToday from 'date-fns/startOfToday';
import endOfToday from 'date-fns/endOfToday';
import subDays from 'date-fns/subDays';
import isWithinInterval from 'date-fns/isWithinInterval';
import isBefore from 'date-fns/isBefore';

import useLocalStorage from '../utils/useLocalStorage';
import { encrypt, decrypt } from '../utils/Crypto';

export type Contact = { key: string; name: string; date: Date };
type Action =
  | { type: 'loading' }
  | { type: 'addContact'; payload: Contact }
  | { type: 'setContacts'; payload: Contact[] };
type State = {
  loading: Boolean;
  contacts: Contact[];
};
export type Dispatch = (action: Action) => void;
export type Contacts = State & {
  contactsToday: Contact[];
  contactsYesterday: Contact[];
  contactsLastSevenDays: Contact[];
  contactsLastFourteenDays: Contact[];
  contactsOlder: Contact[];
};
type ContactsProviderProps = { children: React.ReactNode };

const ContactsStateContext = React.createContext<State | undefined>(undefined);
const ContactsDispatchContext = React.createContext<Dispatch | undefined>(
  undefined,
);

const initialContact: State = {
  contacts: [],
  loading: false,
};
function ContactsProvider({ children }: ContactsProviderProps) {
  const [state, dispatch] = React.useReducer(contactReducer, initialContact);
  const [encryptedContacts, saveEncryptedContact] = useLocalStorage<string>(
    'contacts',
    '',
  );

  React.useEffect(() => {
    const loadContacts = async () => {
      if (encryptedContacts) {
        const decrypted = await decrypt(
          'supersecret',
          JSON.parse(encryptedContacts),
        );
        // format to use Date Objects
        let payload: Contact[] = JSON.parse(decrypted).map(
          (contact: Contact) => {
            return { ...contact, date: new Date(contact.date) };
          },
        );
        // Sort
        payload.sort(
          (prvContact, nextContact) =>
            nextContact.date.valueOf() - prvContact.date.valueOf(),
        );
        dispatch({ type: 'setContacts', payload });
      }
    };

    loadContacts();
  }, [encryptedContacts]);
  function contactReducer(state: State, action: Action) {
    switch (action.type) {
      case 'loading': {
        return {
          ...state,
          loading: true,
        };
      }
      case 'setContacts': {
        return {
          ...state,
          loading: false,
          contacts: action.payload,
        };
      }
      case 'addContact': {
        return {
          ...state,
          loading: false,
          contacts: [...state.contacts, action.payload],
        };
      }
      default: {
        return state;
      }
    }
  }

  const writeContacts = async (contacts: Contact[]) => {
    const encrypted = await encrypt('supersecret', JSON.stringify(contacts));
    saveEncryptedContact(JSON.stringify(encrypted));
    return contacts;
  };

  const asyncDispatch = (action: Action) => {
    switch (action.type) {
      case 'addContact': {
        dispatch({ type: 'loading' });
        writeContacts([...state.contacts, action.payload]).then(() => {
          dispatch(action);
        });
        break;
      }
      default: {
        return dispatch(action);
      }
    }
  };

  return (
    <ContactsStateContext.Provider value={state}>
      <ContactsDispatchContext.Provider value={asyncDispatch}>
        {children}
      </ContactsDispatchContext.Provider>
    </ContactsStateContext.Provider>
  );
}
function useContactsState() {
  const context = React.useContext(ContactsStateContext);
  if (context === undefined) {
    throw new Error('useContactsState must be used within a ContactsProvider');
  }
  return context;
}
function useContactsDispatch() {
  const context = React.useContext(ContactsDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useContactsDispatch must be used within a ContactsProvider',
    );
  }
  return context;
}

function useContact(): { contacts: Contacts; dispatchContact: Dispatch } {
  const contacts = useContactsState();
  const contactsToday = useMemo(
    () => contacts.contacts.filter((contact) => isToday(contact.date)),
    [contacts.contacts],
  );
  const contactsYesterday = useMemo(
    () => contacts.contacts.filter((contact) => isYesterday(contact.date)),
    [contacts.contacts],
  );
  const contactsLastSevenDays = useMemo(() => {
    const lastSevenDaysInterval = {
      start: subDays(startOfToday(), 7),
      end: subDays(endOfToday(), 2),
    };
    return contacts.contacts.filter((contact) =>
      isWithinInterval(contact.date, lastSevenDaysInterval),
    );
  }, [contacts.contacts]);
  const contactsLastFourteenDays = useMemo(() => {
    const lastFourteenDaysInterval = {
      start: subDays(startOfToday(), 14),
      end: subDays(endOfToday(), 8),
    };
    return contacts.contacts.filter((contact) =>
      isWithinInterval(contact.date, lastFourteenDaysInterval),
    );
  }, [contacts.contacts]);

  const contactsOlder = useMemo(() => {
    const older = subDays(endOfToday(), 15);
    return contacts.contacts.filter((contact) => isBefore(contact.date, older));
  }, [contacts.contacts]);

  return {
    contacts: {
      loading: contacts.loading,
      contacts: contacts.contacts,
      contactsToday,
      contactsYesterday,
      contactsLastSevenDays,
      contactsLastFourteenDays,
      contactsOlder,
    },
    dispatchContact: useContactsDispatch(),
  };
}

export { ContactsProvider, useContact };
