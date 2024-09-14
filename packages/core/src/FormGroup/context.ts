import { createContext, useContext } from 'react';
import { GroupStore } from './store';

export const FormGroupContext = createContext<GroupStore>(null);

export const useFormGroupContext = () => {
  return useContext(FormGroupContext);
};
