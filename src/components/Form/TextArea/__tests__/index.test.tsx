import { render, fireEvent } from '@testing-library/react';

import FormProvider from 'providers/FormProvider';
import TextArea from 'components/Form/TextArea';

import textAreaElement from '../fixtures/textAreaElement';

const renderTextArea = () => render(
  <FormProvider>
    <TextArea element={textAreaElement} />
  </FormProvider>,
);

describe('<TextArea />', () => {
    const textAreaLabel = `${textAreaElement.question_text} (required)`;

    test('renders with placeholder', () => {
      const { getByPlaceholderText } = renderTextArea();
      const textArea = getByPlaceholderText(textAreaElement.metadata.placeholder as string);
      expect(textArea).toBeInTheDocument();
    });


    test('renders with label', () => {
      const { getByLabelText } = renderTextArea();
      const textArea = getByLabelText(textAreaLabel);
      expect(textArea).toBeInTheDocument();
    });

    test('strips spaces in the beginning', () => {
      const text = ' hi';

      const { getByLabelText } = renderTextArea();
      const textArea = getByLabelText(textAreaLabel) as HTMLTextAreaElement;
      fireEvent.change(textArea, { target: { value: text }});
      expect(textArea.value).toBe(text.trimStart());
    });

    test('does not strip spaces between words', () => {
      const text = 'hi John';

      const { getByLabelText } = renderTextArea();
      const textArea = getByLabelText(textAreaLabel) as HTMLTextAreaElement;
      fireEvent.change(textArea, { target: { value: text }});
      expect(textArea.value).toBe(text);
    });
});
