import { render, screen } from '@testing-library/react';
import { FormField, FormFieldRendererProps } from './FormField';
import { FormElementValue } from './useDynamicFormState';
import '@testing-library/jest-dom';

describe('Form field  component', () => {
  test('it renders textArea upon given props', () => {
    const testValue = '42';
    const mockData: FormFieldRendererProps = {
      value: testValue,
      fieldId: 'textAreaTestingId',
      fieldType: 'textarea',
      metadata: {
        required: true,
      },
      onChange: ((value: FormElementValue) => console.log(value)),

    };
    render(<FormField {...mockData} />);
    const textBox = screen.getByRole('textbox');
    expect(textBox).toBeInTheDocument();
    expect(textBox).toHaveValue(testValue);
    expect(textBox).toBeRequired();
  });
});
