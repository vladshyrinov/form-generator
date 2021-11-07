import formInstructions from 'data/form_instructions.json';

import { FormFields } from './formReducer';

const job = formInstructions as Frontier.Job;
const { sections } = job;

export const getFormFieldsInitialState = () =>
  sections.reduce((acc, section: Frontier.Section) => {
    for (let element of section.content) {
      if (element.type === 'multichoice') {
        acc[element.id] = [];
      } else {
        acc[element.id] = '';
      }
    }

    return acc;
  }, {} as FormFields);
