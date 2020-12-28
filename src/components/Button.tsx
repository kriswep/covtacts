import React, { useRef } from 'react';
import styled from 'styled-components/macro';
import { useButton } from '@react-aria/button';
import { AriaButtonProps } from '@react-types/button';
import { FocusRing } from '@react-aria/focus';

const StyledButton = styled.button`
  font-size: 1.125rem;
  font-weight: 800;
  padding: 0.5rem;
  color: var(--main-text-color-800);
  background: none;
  border: 1px solid var(--main-text-color-800);
  border-radius: 0.625rem;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  appearance: none;

  &:focus {
    outline: none;
  }
  &:active {
    box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.2);
  }

  &.focus-ring {
    outline: 1px solid dodgerblue;
    outline-offset: 1px;
  }
`;
const Button = (props: AriaButtonProps) => {
  let ref = useRef<HTMLButtonElement>(null);
  let { buttonProps } = useButton(props, ref);
  let { children } = props;

  return (
    <FocusRing focusRingClass="focus-ring">
      <StyledButton {...buttonProps} ref={ref}>
        {children}
      </StyledButton>
    </FocusRing>
  );
};

export default Button;
