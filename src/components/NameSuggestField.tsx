import React, { useState, useEffect } from 'react';
import Autosuggest, { InputProps, ChangeEvent } from 'react-autosuggest';

import Textfield from './Textfield';
import { useContact, Contact } from '../state/Contacts';

type NameSuggestFieldProps = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  // onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  required?: boolean;
};

const NameSuggestField = (props: NameSuggestFieldProps) => {
  const [value, setValue] = useState(props.value);
  const [suggestions, setSuggestions] = useState<Array<Contact>>([]);

  const { contacts } = useContact();

  useEffect(() => {
    props.setValue(value);
  }, [value]);

  useEffect(() => {
    if (value !== props.value) {
      setValue(props.value);
    }
  }, [props.value]);

  // Teach Autosuggest how to calculate suggestions for any given input value.
  const getSuggestions = (value: string) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : contacts.contacts
          .filter((contact) => contact.name.toLowerCase().includes(inputValue))
          .reduce((acc: Contact[], current) => {
            const x = acc.find((item) => item.name === current.name);
            if (!x) {
              return acc.concat([current]);
            } else {
              return acc;
            }
          }, []);
  };

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  const getSuggestionValue = (suggestion: Contact) => suggestion.name;

  // Use your imagination to render suggestions.
  const renderSuggestion = (suggestion: Contact) => (
    <span>{suggestion.name}</span>
  );

  const onChange = (
    _event: React.FormEvent<HTMLInputElement>,
    { newValue }: ChangeEvent,
  ) => {
    setValue(newValue);
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  const onSuggestionsFetchRequested = ({ value }: any) => {
    setSuggestions(getSuggestions(value));
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  // const onSuggestionSelected = (
  //   event: FormEvent<HTMLInputElement>,
  //   { suggestion }: { suggestion: Contact },
  // ) => {
  //   debugger;
  //   console.log(event, suggestion);

  //   props.setValue(event.currentTarget.value);
  //   // props.onChange(event)
  // };

  const renderInputComponent = (inputProps: InputProps<Contact>) => (
    <Textfield
      {...inputProps}
      defaultValue={''}
      label={props.label}
      value={value}
      onChange={(event) => {
        inputProps.onChange(event, {
          method: 'enter',
          newValue: event.currentTarget.value,
        });
      }}
      required={props.required}
    />
  );

  return (
    <Autosuggest
      suggestions={suggestions}
      // onSuggestionSelected={onSuggestionSelected}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={{ value, onChange }}
      renderInputComponent={renderInputComponent}
    />
  );
};

export default NameSuggestField;
