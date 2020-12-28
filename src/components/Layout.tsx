import styled from 'styled-components/macro';

export const Layout = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;
  /* grid-template-columns: 1fr 1fr; */
  grid-template-areas:
    'main'
    'side';

  @media (min-width: 50em) {
    grid-template-columns: minmax(auto, 30rem) 1fr;
    grid-template-areas: 'main side';
  }

  @media (min-width: 80em) {
    grid-template-columns: minmax(auto, 40rem) 1fr;
  }

  @media (min-width: 120em) {
    grid-template-columns: minmax(auto, 50rem) 1fr;
  }
`;

export const Main = styled.section`
  grid-area: main;
  border-radius: 0 0 2.5rem 2.5rem;
  background-color: var(--main-bg-color-500);
  color: var(--main-text-color-800);
  padding: 2rem 1rem 2rem 1rem;

  @media (min-width: 38.75em) {
    padding: 3.75rem;
  }

  @media (min-width: 50em) {
    border-radius: 0 2.5rem 2.5rem 0;
    min-height: 100vh;
  }

  @media (min-width: 80em) {
    padding: 3.75rem 6rem;
  }

  @media (min-width: 120em) {
    padding: 3.75rem 10rem;
  }

  h1 {
    margin: 0 0 4.375rem 0;
    font-weight: 800;
    font-size: 2.25rem;
    line-height: 3rem;
  }

  h2 {
    margin: 0 0 4.375rem 0;
    font-weight: 800;
    font-size: 1.5rem;
    line-height: 2rem;
  }

  p {
    margin: 0 0 4.375rem 0;
    font-size: 1.125rem;
    line-height: 1.5rem;
  }
`;

export const Side = styled.section`
  grid-area: side;
  background-color: var(--main-bg-color-800);
  color: var(--main-text-color-200);
  padding: 3rem 1rem 2rem 1rem;

  @media (min-width: 38.75em) {
    padding: 3.75rem;
  }

  @media (min-width: 50em) {
    min-height: 100vh;
  }

  @media (min-width: 80em) {
    padding: 3.75rem 6rem;
  }

  @media (min-width: 120em) {
    padding: 3.75rem 10rem;
  }

  h1 {
    margin: 0 0 4.375rem 0;
    font-weight: 800;
    font-size: 2.25rem;
    line-height: 3rem;
  }

  h2 {
    margin: 0 0 4.375rem 0;
    font-weight: 800;
    font-size: 1.5rem;
    line-height: 2rem;
  }

  p {
    margin: 0 0 4.375rem 0;
    font-size: 1.125rem;
    line-height: 1.5rem;
  }
`;
