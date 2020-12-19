import React from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { PressEvent } from '@react-types/shared';

import Button from './Button';

type CardProps = {
  title: string;
  aside?: string;
  removeAction?: (event: PressEvent) => void;
};
type LinkProps = {
  linkTo: string;
};

export const Card = ({ title, aside = '', removeAction }: CardProps) => {
  return (
    <section>
      <h3>{title}</h3>
      <aside>
        <small>{aside}</small>
      </aside>
      {removeAction && <Button onPress={removeAction}>Remove</Button>}
    </section>
  );
};

export const LinkCard = ({
  title,
  aside = '',
  linkTo,
}: CardProps & LinkProps) => {
  return (
    <Link to={linkTo}>
      <Card title={title} aside={aside} />
    </Link>
  );
};

export const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  color: #000;
  color: var(--main-text-color-800);

  > section,
  > a {
    flex: 1 1 15rem;
    flex: 1 1 clamp(10rem, 30vw + 5rem, 18rem);
    background-color: #fff;
    color: #000;
    color: var(--main-text-color);
    border-radius: 1rem;
    padding: 0.5rem;
  }
  > a {
    text-decoration: none;
  }
  p {
    margin-block-start: 0;
    margin-block-end: 0.5rem;
  }
`;

export default Card;
