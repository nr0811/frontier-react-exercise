import {useState} from 'react';

export type FormElementValue = string | number | string[];

export type FormStateType = {
  [sectionId: string]: {
    [elementId: string]: FormElementValue;
  };
};

export type UseFormStateReturn = {
  handleFormChange: (
    sectionId: string,
    event: { id: string; value: FormElementValue },
  ) => void;
  formState: FormStateType;
  selectedSectionIndex: number;
  setSelectedSection: (nextIndex: number) => void;
};

export const useDynamicFormState = (
  initialState: Frontier.Job,
): UseFormStateReturn => {
  const arraySections = initialState.sections;
  const formattedInitialState = Object.assign(
    {},
    ...arraySections.map(section => {
      return {
        [section.id]: Object.assign(
          {},
          ...section.content.map(element => ({ [element.id]: '' })),
        ),
      };
    }),
  );

  const [state, setState] = useState<FormStateType>(formattedInitialState);
  const [selectedSection, setSelectedSection] = useState<number>(0);
  const handleFormChange = (
    sectionId: string,
    object: { id: string; value: FormElementValue },
  ) => {
    setState(prevState => {
      const prevStateSection = prevState[sectionId];

      return {
        ...prevState,
        [sectionId]: {
          ...prevStateSection,
          [object.id]: object.value,
        },
      };
    });
  };

  return {
    handleFormChange: handleFormChange,
    formState: state,
    selectedSectionIndex: selectedSection,
    setSelectedSection,
  };
};
