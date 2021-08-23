import styled from 'styled-components';

export const StyledInput = styled.input`
  width: 100%;
  outline: transparent solid 2px;
  outline-offset: 2px;
  position: relative;
  appearance: none;
  font-weight: bold;

  &:focus {
    border: 3px var(--secondary_color) solid;
  }

  &::placeholder {
    color: var(--text_color);
    opacity: 0.5;
  }

  font-size: 15px;
  padding-inline-start: 1em;
  padding-inline-end: 1em;

  height: 40px;
  border-radius: 5px;
  border-width: 1px;
  border-style: solid;
  border-image: initial;
  border-color: var(--secondary_color);
  background: var(--background_color);
`;
