import { createContext, useContext } from 'react';
import { FormStore } from './store';

export type FormContextType = {
  form: FormStore;
} & Pick<
  FormStore,
  'mode' | 'colon' | 'layout' | 'variant' | 'labelCol' | 'labelAlign' | 'wrapperCol' | 'remoteOptionsDebounceProps'
>;

export const FormContext = createContext({} as FormContextType);

export const useFormContext = () => {
  return useContext(FormContext);
};
