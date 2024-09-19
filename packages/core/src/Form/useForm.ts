import { useRef } from 'react';
import { FormStore } from './store';
import type { FormOptionProps } from './interface';

export const useForm = <Values = any, P = any>(props?: FormOptionProps<P>): [FormStore<Values, P>] => {
  const formRef = useRef<FormStore<Values, P>>();

  if (!formRef.current) {
    formRef.current = new FormStore<Values, P>(props);
  }

  return [formRef.current];
};
