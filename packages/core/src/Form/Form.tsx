import React, { PropsWithChildren } from 'react';
import { Form as AForm } from 'antd';
import type { FormProps as AFormProps } from 'antd/lib/form';
import { FormStore } from './store';
import { FormContext } from './context';

const { useForm: useAForm } = AForm;

export interface FormProps<Values = any> extends Omit<AFormProps<Values>, 'form'> {
  form: FormStore;
}

export const Form: React.FC<PropsWithChildren<FormProps>> = (props) => {
  const { children, form: formStore } = props;

  const [aForm] = useAForm();

  formStore.setFormInstance(aForm);

  return (
    <FormContext.Provider value={formStore}>
      <AForm form={aForm}>{children}</AForm>
    </FormContext.Provider>
  );
};
