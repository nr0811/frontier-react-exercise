import { InputField } from './InputField';
import React, { ChangeEvent, FormEvent } from 'react';
import { FormStateType, useFormState } from '../../hooks/useFormState';

export type DynamicFormProps = {
  job: Frontier.Job;
  handleSubmit: (formState: FormStateType) => void;
};
export const DynamicForm = ({ job, handleSubmit }: DynamicFormProps) => {
  let initialFormState: FormStateType = job.sections.reduce((ac, a) => {
    return {
      ...ac,
      [a.id]: a.content.map(value => ({ id: value.id, value: '' })),
    };
  }, {});

  const {
    formState,
    handleFormChange,
    setSelectedSection,
    selectedSectionIndex,
  } = useFormState(initialFormState);

  const handleSubmitInternal = (event: FormEvent) => {
    event.preventDefault();
    handleSubmit(formState);
  };

  const currentSection = job.sections[selectedSectionIndex];

  return (
    <form onSubmit={handleSubmitInternal}>
      <div style={{ maxWidth: '300px' }}>
        <h1>{currentSection.title}</h1>
        {currentSection.content.map(element => {
          return (
            <InputField
              key={`key-${currentSection.id}_${element.id}`}
              {...element.metadata}
              value={formState[currentSection.id][element.id] || ''}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                handleFormChange(currentSection.id, {
                  id: element.id,
                  value: event.target.value,
                })
              }
            />
          );
        })}
      </div>
      {selectedSectionIndex === job.sections.length - 1 ? (
        <div>
          <button onClick={() => setSelectedSection(0)}>Prev</button>
          <button type={'submit'}>submit</button>
        </div>
      ) : (
        <button onClick={() => setSelectedSection(1)}>Next</button>
      )}
    </form>
  );
};
