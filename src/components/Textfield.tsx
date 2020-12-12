import React, { useRef } from 'react';
import styled from 'styled-components/macro';
import { useTextField } from '@react-aria/textfield';
import { AriaTextFieldProps } from '@react-types/textfield';

type TextfieldProps = {
  onClick?: () => void;
};

const Textfield = (props: AriaTextFieldProps & TextfieldProps) => {
  const { label } = props;
  const ref = useRef<HTMLInputElement>(null);
  const { labelProps, inputProps } = useTextField(props, ref);
  return (
    <Field>
      <Label {...labelProps}>{label}</Label>
      <Input {...inputProps} ref={ref} onClick={props.onClick} />
    </Field>
  );
};

const Field = styled.div`
  display: flex;
  flex-direction: column;
`;
const Label = styled.label``;
const Input = styled.input``;

export default Textfield;
