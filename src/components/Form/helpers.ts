import formInstructions from 'data/form_instructions.json';
import { FormFields } from 'providers/FormProvider/formReducer';

const job = formInstructions as Frontier.Job;
const { sections } = job;

export const isFormButtonDisabled = (
  currentSection: number,
  formFields: FormFields,
  errors: string[],
) => {
  const section = sections[currentSection];

  const areFieldsFilled = section.content.every(
    ({ metadata, type, id }: Frontier.Element) =>
      !metadata.required ||
      (type === 'multichoice' &&
        Array.isArray(formFields[id]) &&
        (formFields[id] as string[])?.length) ||
      (formFields[id] !== undefined && formFields[id] !== ''),
  );

  const errorsPresent = errors.length !== 0;

  return !areFieldsFilled || errorsPresent;
};
