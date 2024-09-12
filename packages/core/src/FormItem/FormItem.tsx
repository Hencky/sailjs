import { PropsWithChildren, cloneElement, useEffect, useMemo, useState } from 'react';
import { Form, Col } from 'antd';
import { useDebounceEffect } from 'ahooks';
import { observer } from 'mobx-react-lite';
import { FieldStore } from './store';
import { useFormContext } from '../Form/context';
import { useFormGroupContext } from '../FormGroup';
import { type FormItemProps, FieldMode } from './interface';

const { Item, useFormInstance } = Form;

export const FormItem: <ValuesType = any, OptionType = any>(
  props: PropsWithChildren<FormItemProps<ValuesType, OptionType>>
) => React.ReactNode = observer((props) => {
  const { name, children, ...restProps } = props;

  const [updateKey, update] = useState({});

  const { form: formStore, ...formCtx } = useFormContext();

  const formGroupCtx = useFormGroupContext();

  const assignProps = Object.assign({}, formCtx, formGroupCtx, props);

  const form = useFormInstance();

  const forceUpdate = () => update({});

  const field = useMemo(() => {
    return formStore.createField(
      // @ts-expect-error
      name,
      new FieldStore(assignProps, { ...formStore, ...form }, forceUpdate)
    );
  }, []);

  const { remoteOptionsDebounceProps } = assignProps;

  useDebounceEffect(
    () => {
      field.fetchRemoteOptions();
    },
    [updateKey],
    remoteOptionsDebounceProps
  );

  useEffect(() => {
    // @ts-expect-error
    formStore.addField(name, field);
    return () => {
      formStore.removeField(name);
    };
  }, []);

  if (field.mode === FieldMode.NODE) {
    return null;
  }

  const element = (
    <Item {...restProps} {...field.fieldProps} name={name}>
      {/* @ts-expect-error */}
      {cloneElement(children, { ...field.childProps })}
    </Item>
  );

  if (field.colProps.span === null) {
    return element;
  }

  return <Col {...field.colProps}>{element}</Col>;
});
