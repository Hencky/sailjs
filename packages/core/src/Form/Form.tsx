import { PropsWithChildren, useEffect, useMemo } from 'react';
import { Form as AForm, Spin } from 'antd';
import { observer } from 'mobx-react-lite';
import { FormContext } from './context';
import type { FormProps } from './interface';
import type { PluginsType } from '../plugins';

const { useForm: useAForm } = AForm;

export const Form = observer(
  <ValuesType, P extends PluginsType = any>(props: PropsWithChildren<FormProps<ValuesType, P>>) => {
    const { children, form: formStore, onValuesChange } = props;

    const [aForm] = useAForm();

    formStore.setFormInstance(aForm);

    useEffect(() => {
      formStore.init(props);
    }, []);

    const formContextValue = useMemo(() => {
      return formStore;
    }, [formStore]);

    return (
      <FormContext.Provider value={formContextValue}>
        <Spin spinning={formStore.loading}>
          <AForm<ValuesType>
            {...formStore.formProps}
            form={aForm}
            onValuesChange={(changeValues, values) => {
              formStore.innerValueChange(changeValues);
              onValuesChange?.(changeValues, values);
            }}
          >
            {children}
          </AForm>
        </Spin>
      </FormContext.Provider>
    );
  }
);
