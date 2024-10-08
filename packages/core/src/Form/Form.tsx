import { PropsWithChildren, useEffect, useMemo } from 'react';
import { Form as AForm, Spin } from 'antd';
import { observer } from 'mobx-react-lite';
import { FormContext } from './context';
import type { PluginsType } from '@sailjs/shared';
import type { FormProps } from './interface';

const { useForm: useAForm, useWatch: useAWatch } = AForm;

export { useAWatch, useAForm };

export const Form = observer(<Values, P extends PluginsType = any>(props: PropsWithChildren<FormProps<Values, P>>) => {
  const {
    children,
    form: formStore,
    onValuesChange,
    spinProps,
    remoteValues,
    remoteOptionsDebounceProps,
    ...restProps
  } = props;

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
      <Spin spinning={formStore.loading} {...spinProps}>
        <AForm<Values>
          {...restProps}
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
});
