import React, { useState, useRef } from 'react';
import {
  useOverlay,
  usePreventScroll,
  useModal,
  OverlayContainer,
  OverlayProps,
} from '@react-aria/overlays';
import { useDialog } from '@react-aria/dialog';
import { FocusScope } from '@react-aria/focus';
import { AriaDialogProps } from '@react-types/dialog';
import { AriaTextFieldProps } from '@react-types/textfield';
import ReactDatePicker from 'react-datepicker';

import Textfield from './Textfield';
import Button from './Button';

type ModalDialogProp = {
  title: string;
  children: React.ReactElement;
};

const ModalDialog = (
  props: OverlayProps & AriaDialogProps & ModalDialogProp,
) => {
  let { title, children } = props;
  // Handle interacting outside the dialog and pressing
  // the Escape key to close the modal.
  let ref = useRef(null);
  let { overlayProps } = useOverlay(props, ref);

  // Prevent scrolling while the modal is open, and hide content
  // outside the modal from screen readers.
  usePreventScroll();
  let { modalProps } = useModal();

  // Get props for the dialog and its title
  let { dialogProps, titleProps } = useDialog(props, ref);

  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 100,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <FocusScope contain restoreFocus autoFocus>
        <div
          {...overlayProps}
          {...dialogProps}
          {...modalProps}
          ref={ref}
          style={{
            background: 'white',
            color: 'black',
            padding: 30,
          }}
        >
          <h3 {...titleProps} style={{ marginTop: 0 }}>
            {title}
          </h3>
          {children}
        </div>
      </FocusScope>
    </div>
  );
};

type DatePickerProps = {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  label: string;
  required?: boolean;
};

const DatePicker = (props: DatePickerProps & AriaTextFieldProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [ignoreNextFocus, setIgnoreNextFocus] = useState(false);

  return (
    <>
      <Textfield
        {...props}
        // type="date"
        value={props.date.toLocaleDateString()}
        onFocus={() => {
          /* We ignore the next focus event, since closing the modals focuses this input again */
          if (!ignoreNextFocus) {
            setIsOpen(true);
          } else {
            setIgnoreNextFocus(false);
          }
        }}
        onClick={() => setIsOpen(true)}
      />
      {isOpen && (
        <OverlayContainer>
          <ModalDialog
            title={props.label}
            isOpen
            onClose={() => {
              setIgnoreNextFocus(true);
              setIsOpen(false);
            }}
            isDismissable
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsOpen(false);
              }}
            >
              <ReactDatePicker
                selected={props.date}
                onChange={(date) => {
                  if (date && !Array.isArray(date)) props.setDate(date);
                }}
                inline
              />
              <Button
                onPress={() => {
                  setIgnoreNextFocus(true);
                  setIsOpen(false);
                }}
              >
                Close
              </Button>
            </form>
          </ModalDialog>
        </OverlayContainer>
      )}
    </>
  );
};

export default DatePicker;
