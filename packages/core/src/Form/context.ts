import { createContext, useContext } from 'react';
import type { FormStore } from '../Form';
import type { BaseProps } from '../Base';

export interface FormContextType<ValuesType = any> extends BaseProps {
  form: FormStore<ValuesType>;
}

export const FormContext = createContext({} as FormContextType);

export const useFormContext = () => {
  return useContext(FormContext);
};
