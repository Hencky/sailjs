import { createContext, useContext } from 'react';
import { FormStore } from './store';
import { CommonPropType } from '../FormGroup';

export type FormContextType = {
  form: FormStore;
} & Pick<FormStore, CommonPropType>;

export const FormContext = createContext({} as FormContextType);

export const useFormContext = () => {
  return useContext(FormContext);
};
