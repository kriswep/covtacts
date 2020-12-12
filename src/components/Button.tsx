import React, { useRef } from 'react';
import styled from 'styled-components/macro';
import { useButton } from '@react-aria/button';
import { AriaButtonProps } from '@react-types/button';

const StyledButton = styled.button``;
const Button = (props: AriaButtonProps) => {
  let ref = useRef<HTMLButtonElement>(null);
  let { buttonProps } = useButton(props, ref);
  let { children } = props;

  return (
    <StyledButton {...buttonProps} ref={ref}>
      {children}
    </StyledButton>
  );
};

export default Button;
