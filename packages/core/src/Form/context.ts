import { createContext, useContext } from 'react';
import type { FormStore } from '../Form';

export const FormContext = createContext(null as unknown as FormStore<any, any>);

export const useFormContext = <ValuesType = any, P = any>() => {
  return useContext<FormStore<ValuesType, P>>(FormContext);
};
