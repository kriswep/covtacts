import React from 'react';
import useLocalStorage from '../utils/useLocalStorage';
import { encrypt, decrypt } from '../utils/Crypto';

export type Contact = { key: string; name: string; date: Date };
type Action =
  | { type: 'loading' }
  | { type: 'addContact'; payload: Contact }
  | { type: 'setContacts'; payload: Contact[] };
type Dispatch = (action: Action) => void;
type State = { contacts: Contact[]; loading: Boolean };
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
        const payload = JSON.parse(decrypted);
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

function useContact(): [State, Dispatch] {
  return [useContactsState(), useContactsDispatch()];
}

export { ContactsProvider, useContact };
