import { useRef } from 'react';
import { FormStore } from './store';

export const useForm = () => {
  const formRef = useRef<FormStore>();

  if (!formRef.current) {
    formRef.current = new FormStore();
  }

  return [formRef.current];
};
