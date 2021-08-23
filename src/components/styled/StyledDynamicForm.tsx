import styled from 'styled-components';

export const StyledDynamicForm = styled.form<Frontier.Theme>`
  --primary_color: ${props => props.primary_color};
  --secondary_color: ${props => props.secondary_color};
  --background_color: ${props => props.background_color};
  --text_color: ${props => props.text_color};
`;
