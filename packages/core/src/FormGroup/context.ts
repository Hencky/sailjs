import { createContext, useContext } from 'react';
// import { FormStore } from './store';

export type CommonPropType =
  | 'mode'
  | 'help'
  | 'colon'
  | 'layout'
  | 'variant'
  | 'labelCol'
  | 'labelAlign'
  | 'wrapperCol'
  | 'validateDebounce'
  | 'remoteOptionsDebounceProps';

export const FormGroupContext = createContext({});

export const useFormGroupContext = () => {
  return useContext(FormGroupContext);
};
