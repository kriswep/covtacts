import React, { useRef } from 'react';
import styled from 'styled-components/macro';
import { useTextField } from '@react-aria/textfield';
import { AriaTextFieldProps } from '@react-types/textfield';

// type TextfieldProps = {
//   onClick?: () => void;
//   required?: boolean;
// };

interface OmitInterface {
  <T extends object, K extends [...(keyof T)[]]>(obj: T, ...keys: K): {
    [K2 in Exclude<keyof T, K[number]>]: T[K2];
  };
}

const omit: OmitInterface = (obj, ...keys) => {
  const ret = {} as {
    [K in keyof typeof obj]: typeof obj[K];
  };
  let key: keyof typeof obj;
  for (key in obj) {
    if (!keys.includes(key)) {
      ret[key] = obj[key];
    }
  }
  return ret;
};

const Textfield = (
  // props: AriaTextFieldProps & TextfieldProps
  props: Omit<AriaTextFieldProps, 'onChange'> &
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
      onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    },
) => {
  const { label } = props;
  const ref = useRef<HTMLInputElement>(null);
  const { labelProps, inputProps } = useTextField(omit(props, 'onChange'), ref);
  return (
    <Field>
      <Label {...labelProps}>{label}</Label>
      <Input
        required={props.required}
        {...inputProps}
        ref={ref}
        onClick={props.onClick}
        onChange={props.onChange}
      />
    </Field>
  );
};

const Field = styled.div`
  display: flex;
  flex-direction: column;
`;
const Label = styled.label`
  font-size: 1rem;
`;
const Input = styled.input`
  font-size: 1rem;
`;

export default Textfield;
