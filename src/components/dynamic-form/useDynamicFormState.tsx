import { useState } from 'react';

type FormElementValue = string | number;

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

export const useFormState = (
  initialState: FormStateType,
): UseFormStateReturn => {
  const [state, setState] = useState<FormStateType>(initialState);

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
