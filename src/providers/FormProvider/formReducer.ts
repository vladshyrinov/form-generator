import { getFormFieldsInitialState } from './helpers';

export enum FormActionType {
  CHANGE_FIELD_VALUE = 'CHANGE_FIELD_VALUE',
  CHANGE_CURRENT_SECTION = 'CHANGE_CURRENT_SECTION',
}

export type FormFields = Record<string, string | number | readonly string[] | undefined>;

export interface FormState {
  formFields: FormFields;
  currentSection: number;
}

interface FormActionPayload {
  field?: string;
  value: any;
}

export interface FormAction {
  type: FormActionType;
  payload: FormActionPayload;
}

export const initialState: FormState = {
  formFields: getFormFieldsInitialState(),
  currentSection: 0,
};

export const formReducer = (
  state: FormState,
  action: FormAction,
): FormState => {
  const { type, payload } = action;

  switch (type) {
    case FormActionType.CHANGE_FIELD_VALUE:
      return {
        ...state,
        formFields: {
          ...state.formFields,
          [String(payload.field)]: payload.value,
        },
      };
    case FormActionType.CHANGE_CURRENT_SECTION:
      return {
        ...state,
        currentSection: payload.value,
      };
    default:
      return state;
  }
};
