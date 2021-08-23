import { StyledInput } from '../styled/StyledInput';
import { StyledTextArea } from '../styled/StyledTextArea';
import { BooleanButton } from './BooleanButton';
import { ChangeEvent } from 'react';
import { StyledSelect } from '../styled/StyledSelect';
import { StyledSelectOption } from '../styled/StyledSelectOption';
import { FormElementValue } from './useDynamicFormState';

export type FormFieldRendererProps = {
  fieldId: string;
  fieldType: Frontier.Element['type'];
  value: FormElementValue;
  onChange: (value: FormElementValue) => void;
  options?: Frontier.ElementMeta['options'];
  metadata: Frontier.ElementMeta;
};

export const FormField = ({
                            fieldId,
                            fieldType,
                            metadata,
                            ...props
                          }: FormFieldRendererProps) => {
  switch (fieldType) {
    case 'boolean':
      return (
          <BooleanButton
              key={fieldId}
              value={props.value}
              onChange={props.onChange}
              metadata={metadata}
          />
      );

    case 'multichoice':
      const { options, ...restMeta } = metadata;
      return (
        <StyledSelect
          key={fieldId}
          {...restMeta}
          multiple
          value={props.value || []}
          onChange={(event: ChangeEvent<HTMLSelectElement>) => {
            let value = Array.from(
              event.target.selectedOptions,
              option => option.value,
            );
            props.onChange(value);
          }}
        >
          {options?.map((option: { label: string; value: string }, index) => (
            <StyledSelectOption
              key={`${option.value}-${index}`}
              value={option.value}
            >
              {option.label}
            </StyledSelectOption>
          ))}
        </StyledSelect>
      );
    //   return <SelectField id={id} onChange={onChange} multiple {...rest} />
    case 'textarea':
      return (
        <StyledTextArea
          key={fieldId}
          value={props.value as string}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
            props.onChange(event.target.value)
          }
          {...metadata}
        />
      );
    default:
      return (
        <StyledInput
          key={fieldId}
          value={props.value as string}
          type={metadata.format}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            props.onChange(event.target.value)
          }
          {...metadata}
        />
      );
  }
};
