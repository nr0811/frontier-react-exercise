import React from 'react';
import formInstructions from '../data/form_instructions.json';
import GlobalStyle from '../globalStyles';
import { DynamicForm } from './dynamic-form/DynamicForm';
import { FormStateType } from './dynamic-form/useDynamicFormState';
import styled from 'styled-components';

const FormPlacement = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-top: 4vw;
  max-width: 60vh;
`;

function App() {
  const job = formInstructions as Frontier.Job;
  console.log(job);
  const handleSubmit = (formState: FormStateType) => {
    console.log(formState);
  };
  return (
    <>
      <GlobalStyle />
      <FormPlacement>
        <DynamicForm handleSubmit={handleSubmit} job={job} />
      </FormPlacement>
    </>
  );
}

export default App;
