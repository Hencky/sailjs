import { createContext, useContext } from 'react';
import type { FormStore } from '../Form';

export const FormContext = createContext<FormStore>(null);

export const useFormContext = () => {
  return useContext(FormContext);
};
