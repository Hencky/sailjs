import { useRef } from 'react';
import { FormStore } from './store';
import type { FormOptionProps } from './interface';

export const useForm = <ValuesType = any, P = any>(props?: FormOptionProps<P>): [FormStore<ValuesType, P>] => {
  const formRef = useRef<FormStore<ValuesType, P>>();

  if (!formRef.current) {
    formRef.current = new FormStore<ValuesType, P>(props);
  }

  return [formRef.current];
};
