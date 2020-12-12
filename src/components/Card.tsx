import React from 'react';
import styled from 'styled-components/macro';

type CardProps = {
  title: string;
  aside?: string;
};

export const Card = ({ title, aside = '' }: CardProps) => {
  return (
    <section>
      <h3>{title}</h3>
      <aside>
        <small>{aside}</small>
      </aside>
    </section>
  );
};

export const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  > section {
    flex: 1 1 15rem;
    flex: 1 1 clamp(10rem, 30vw + 5rem, 18rem);
    background-color: #fff;
    border-radius: 1rem;
    padding: 0.5rem;
  }
  p {
    margin-block-start: 0;
    margin-block-end: 0.5rem;
  }
`;

export default Card;
