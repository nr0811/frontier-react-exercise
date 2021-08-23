import styled from 'styled-components';

export interface StyledButtonProps {
  borderRadius?: string;
}

interface StyledBooleanButtonProps extends StyledButtonProps {
  isChecked: boolean;
}

export const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  appearance: none;
  align-items: center;
  justify-content: center;
  user-select: none;
  position: relative;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  border: none;
  width: auto;
  line-height: 1.2;
  border-radius: ${props => (props.borderRadius ? props.borderRadius : '10px')};
  font-weight: bold;
  height: 50px;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;

  &:hover {
    opacity: 0.85;
  }

  font-size: 15px;
  padding-inline-start: 1em;
  padding-inline-end: 1em;
  width: 100%;
  background: var(--primary_color);
  color: var(--text_color);
`;

export const StyledBooleanButton = styled(
  StyledButton,
)<StyledBooleanButtonProps>`
  border-radius: ${props => props.borderRadius};
  box-shadow: none;
  background: ${props =>
      props.isChecked ? 'var(--background_color)' : 'white'};

  &:hover {
    background: var(--background_color);
  }

  border-color: var(--secondary_color);
  border-style: solid;
  border-width: ${props => (props.isChecked ? '3px' : '2px')};
`;
