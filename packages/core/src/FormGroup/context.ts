import { createContext, useContext } from 'react';
// import { FormStore } from './store';

export type CommonPropType =
  | 'mode'
  | 'colon'
  | 'layout'
  | 'variant'
  | 'labelCol'
  | 'labelAlign'
  | 'wrapperCol'
  | 'validateDebounce'
  | 'remoteOptionsDebounceProps'
  // ColProps
  | 'span'
  | 'offset'
  | 'push'
  | 'pull'
  | 'order'
  | 'flex';

export const FormGroupContext = createContext({});

export const useFormGroupContext = () => {
  return useContext(FormGroupContext);
};
