import React, { PropsWithChildren } from 'react';
import { Form as AForm } from 'antd';
import { FormContext } from './context';
import type { FormProps } from './interface';

const { useForm: useAForm } = AForm;

export const Form: React.FC<PropsWithChildren<FormProps>> = (props) => {
  const { children, form: formStore, onValuesChange } = props;

  const [aForm] = useAForm();

  formStore.setFormInstance(aForm);
  formStore.setProps(props);

  return (
    <FormContext.Provider value={formStore}>
      <AForm
        form={aForm}
        onValuesChange={(changeValues, values) => {
          formStore.onValuesChange(changeValues, values);
          onValuesChange?.(changeValues, values);
        }}
      >
        {children}
      </AForm>
    </FormContext.Provider>
  );
};
