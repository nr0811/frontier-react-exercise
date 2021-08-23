import React, { FormEvent, useRef } from 'react';
import {
  FormElementValue,
  FormStateType,
  useDynamicFormState,
} from './useDynamicFormState';
import { StyledLabel } from '../styled/StyledLabel';
import { FormField } from './FormField';
import { StyledButton } from '../styled/StyledButton';
import { StyledDynamicForm } from '../styled/StyledDynamicForm';
import { StyledFlex } from '../styled/StyledFlex';

export type DynamicFormProps = {
  job: Frontier.Job;
  handleSubmit: (formState: FormStateType) => void;
};

export const DynamicForm = ({ job, handleSubmit }: DynamicFormProps) => {
  const ref = useRef<HTMLFormElement>(null);

  const {
    formState,
    handleFormChange,
    setSelectedSection,
    selectedSectionIndex,
  } = useDynamicFormState(job);

  const handleSubmitInternal = (event: FormEvent) => {
    event.preventDefault();
    handleSubmit(formState);
  };

  const currentSection = job.sections[selectedSectionIndex];

  return (
    <StyledDynamicForm {...job.theme} ref={ref} onSubmit={handleSubmitInternal}>
      <div style={{ margin: '0.5em' }}>
        <h1>{currentSection.title}</h1>
        {currentSection.content.map(element => {
          return (
            <div
              key={`div_${element.id}`}
              style={{ paddingTop: '10px', paddingBottom: '10px' }}
            >
              <StyledLabel htmlFor={element.id}>
                {element.question_text}
              </StyledLabel>
              <FormField
                fieldId={`key-${currentSection.id}_${element.id}`}
                fieldType={element.type}
                metadata={element.metadata}
                value={formState[currentSection.id][element.id] || ''}
                onChange={(value: FormElementValue) =>
                  handleFormChange(currentSection.id, {
                    id: element.id,
                    value: value,
                  })
                }
              />
            </div>
          );
        })}
        <div style={{ marginTop: '5px' }}>
          {selectedSectionIndex === job.sections.length - 1 ? (
            <StyledFlex>
              <StyledButton
                borderRadius={'10px 0px 0px 10px'}
                onClick={() => setSelectedSection(0)}
              >
                Prev
              </StyledButton>
              &nbsp;
              <StyledButton borderRadius={'0px 10px 10px 0px'} type={'submit'}>
                Submit
              </StyledButton>
            </StyledFlex>
          ) : (
            <StyledButton
              onClick={() => {
                const formIsValid = ref?.current?.checkValidity();
                if (formIsValid) {
                  setSelectedSection(1);
                } else {
                  ref?.current?.reportValidity();
                }
              }}
            >
              Next
            </StyledButton>
          )}
        </div>
      </div>
    </StyledDynamicForm>
  );
};
