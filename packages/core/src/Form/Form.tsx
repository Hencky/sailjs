import { PropsWithChildren, useEffect } from 'react';
import { Form as AForm, Spin } from 'antd';
import { observer } from 'mobx-react-lite';
import { FormContext } from './context';
import type { FormProps } from './interface';

const { useForm: useAForm } = AForm;

export const Form: <ValuesType = any>(props: PropsWithChildren<FormProps<ValuesType>>) => React.ReactNode = observer(
  (props: PropsWithChildren<FormProps<any>>) => {
    const { children, form: formStore, onValuesChange } = props;

    const [aForm] = useAForm();

    formStore.setFormInstance(aForm);

    useEffect(() => {
      formStore.init(props);
    }, []);

    return (
      <FormContext.Provider value={formStore}>
        <Spin spinning={formStore.loading}>
          <AForm
            form={aForm}
            onValuesChange={(changeValues, values) => {
              formStore.innerValueChange(changeValues);
              onValuesChange?.(changeValues, values);
            }}
            {...formStore.formProps}
          >
            {children}
          </AForm>
        </Spin>
      </FormContext.Provider>
    );
  }
);
