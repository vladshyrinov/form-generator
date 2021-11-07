import Section from 'components/Section';
import formInstructions from 'data/form_instructions.json';
import { useFormContext } from 'providers/FormProvider/FormContext';
import { FormActionType, FormFields } from 'providers/FormProvider/formReducer';
import { useMemo } from 'react';

const job = formInstructions as Frontier.Job;
const { sections } = job;

const isFormButtonDisabled = (
  currentSection: number,
  formFields: FormFields,
) => {
  const section = sections[currentSection];

  return !section.content.every(
    (element: Frontier.Element) =>
      !element.metadata.required ||
      (formFields[element.id] !== undefined && formFields[element.id] !== ''),
  );
};

const Form = () => {
  const {
    state: { currentSection, formFields },
    dispatch,
  } = useFormContext();

  const isSubmit = currentSection === sections.length - 1;

  const onNext = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    dispatch({
      type: FormActionType.CHANGE_CURRENT_SECTION,
      payload: { value: currentSection + 1 },
    });
  };

  const onSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    console.log(formFields);
  };

  const isButtonDisabled = useMemo(
    () => isFormButtonDisabled(currentSection, formFields),
    [currentSection, formFields],
  );

  return (
    <form>
      <Section
        key={sections[currentSection].id}
        section={sections[currentSection]}
      />
      <button
        onClick={isSubmit ? onSubmit : onNext}
        disabled={isButtonDisabled}
      >
        {isSubmit ? 'Submit' : 'Next'}
      </button>
    </form>
  );
};

export default Form;
