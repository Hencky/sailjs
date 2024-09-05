import { PropsWithChildren } from 'react';
import { Form as AForm } from 'antd';
import { FormContext } from './context';
import type { FormProps } from './interface';

const { useForm: useAForm } = AForm;

export function Form<ValuesType = any>(props: PropsWithChildren<FormProps<ValuesType>>) {
  const { children, form: formStore, onValuesChange } = props;

  const [aForm] = useAForm();

  formStore.setFormInstance(aForm);
  formStore.setProps(props);

  return (
    <FormContext.Provider value={formStore}>
      <AForm<ValuesType>
        form={aForm}
        onValuesChange={(changeValues, values) => {
          formStore.onValuesChange(changeValues);
          onValuesChange?.(changeValues, values);
        }}
      >
        {children}
      </AForm>
    </FormContext.Provider>
  );
}
