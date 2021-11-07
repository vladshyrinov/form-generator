import { useMemo } from 'react';
import Section from 'components/Section';
import formInstructions from 'data/form_instructions.json';
import { useFormContext } from 'providers/FormProvider/FormContext';
import { FormActionType } from 'providers/FormProvider/formReducer';

import { isFormButtonDisabled } from './helpers';

const job = formInstructions as Frontier.Job;
const { sections } = job;

const Form = () => {
  const {
    state: { currentSection, formFields, errors },
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
    () => isFormButtonDisabled(currentSection, formFields, errors),
    [currentSection, formFields, errors],
  );

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md mx-auto sm:max-w-xl border border-primary_color">
      <span className="text-sm">
        Step {currentSection + 1} of {sections.length}
      </span>
      <form>
        <Section
          key={sections[currentSection].id}
          section={sections[currentSection]}
        />
        <button
          className={`my-5 ${
            isButtonDisabled ? 'bg-gray-500' : 'bg-green-500'
          } text-white font-semibold py-2 px-4 rounded`}
          onClick={isSubmit ? onSubmit : onNext}
          disabled={isButtonDisabled}
        >
          {isSubmit ? 'Submit' : 'Next'}
        </button>
      </form>
    </div>
  );
};

export default Form;
