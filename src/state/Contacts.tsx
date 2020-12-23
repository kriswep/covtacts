import React, { useMemo, useState } from 'react';
import { useMatomo } from '@datapunt/matomo-tracker-react';
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
export type Action =
  | { type: 'setPassword'; payload: { password: string } }
  | { type: 'addContact'; payload: Contact }
  | { type: 'removeContact'; payload: { contactKey: string } };
type InternalAction =
  | { type: 'loading' }
  | {
      type: 'setAuthenticated';
      payload: { authenticated: Boolean; error?: string };
    }
  | { type: 'setContacts'; payload: Contact[] }
  | { type: 'setInitial'; payload: { initial: Boolean } };

export type Dispatch = (action: Action) => void;

type State = {
  error: string;
  loading: Boolean;
  initial: Boolean;
  unauthenticated: Boolean;
  contacts: Contact[];
};
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
  error: '',
  loading: false,
  initial: false,
  unauthenticated: true,
  contacts: [],
};
function ContactsProvider({ children }: ContactsProviderProps) {
  const [password, setPassword] = useState('');
  const [state, dispatch] = React.useReducer(contactReducer, initialContact);
  const [encryptedContacts, saveEncryptedContact] = useLocalStorage<string>(
    'contacts',
    '',
  );

  const { trackEvent } = useMatomo();

  React.useEffect(() => {
    if (encryptedContacts.length > 0 && state.initial) {
      dispatch({
        type: 'setInitial',
        payload: { initial: false },
      });
    } else if (encryptedContacts.length < 1 && !state.initial) {
      dispatch({ type: 'setInitial', payload: { initial: true } });
    }
  }, [encryptedContacts, state.initial]);

  React.useEffect(() => {
    const loadContacts = async () => {
      if (encryptedContacts.length < 1 && password.length > 0) {
        // we have a password, but no stored data (initial state)
        // we're authenticated right away
        dispatch({
          type: 'setAuthenticated',
          payload: {
            authenticated: true,
            error: '',
          },
        });
      } else if (encryptedContacts && password.length > 0) {
        // we have a password and stored data
        try {
          const decrypted = await decrypt(
            password,
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
          // everything worked, we're authenticated
          dispatch({
            type: 'setAuthenticated',
            payload: {
              authenticated: true,
              error: '',
            },
          });
        } catch (e) {
          // Propably wrong password, reset it
          dispatch({
            type: 'setPassword',
            payload: { password: '' },
          });
          dispatch({
            type: 'setAuthenticated',
            payload: {
              authenticated: false,
              error: 'Unable to decrypt the data',
            },
          });
        }
      }
    };

    loadContacts();
  }, [encryptedContacts, password]);

  function contactReducer(state: State, action: Action | InternalAction) {
    switch (action.type) {
      case 'loading': {
        return {
          ...state,
          loading: true,
        };
      }
      case 'setPassword': {
        setPassword(action.payload.password);
        return {
          ...state,
        };
      }
      case 'setInitial':
        return {
          ...state,
          initial: action.payload.initial,
        };
      case 'setAuthenticated':
        if (!action.payload.authenticated) {
          // unauthenticated, remove password
          setPassword('');
        }
        return {
          ...state,
          error: action.payload.error ? action.payload.error : '',
          unauthenticated: !action.payload.authenticated,
        };

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
      case 'removeContact': {
        return {
          ...state,
          loading: false,
          contacts: [
            ...state.contacts.filter(
              (contact) => contact.key !== action.payload.contactKey,
            ),
          ],
        };
      }
      default: {
        return state;
      }
    }
  }

  const writeContacts = async (contacts: Contact[]) => {
    const encrypted = await encrypt(password, JSON.stringify(contacts));
    saveEncryptedContact(JSON.stringify(encrypted));
    return contacts;
  };

  const asyncDispatch = (action: Action) => {
    switch (action.type) {
      case 'addContact': {
        // dispatch({ type: 'loading' }); // Optional: Delay it
        writeContacts([...state.contacts, action.payload]).then(() => {
          dispatch(action);
          trackEvent({ category: 'contact', action: 'add-contact' });
        });
        break;
      }
      case 'removeContact': {
        // dispatch({ type: 'loading' }); // Optional: Delay it
        writeContacts([
          ...state.contacts.filter(
            (contact) => contact.key !== action.payload.contactKey,
          ),
        ]).then(() => {
          dispatch(action);
          trackEvent({ category: 'contact', action: 'remove-contact' });
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
      initial: contacts.initial,
      unauthenticated: contacts.unauthenticated,
      contacts: contacts.contacts,
      error: contacts.error,
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
