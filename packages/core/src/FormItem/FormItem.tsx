/* eslint-disable @typescript-eslint/no-unused-vars */
import { PropsWithChildren, cloneElement, useEffect, useMemo, useState } from 'react';
import { Form } from 'antd';
import { useDebounceEffect } from 'ahooks';
import { observer } from 'mobx-react-lite';
import { FieldStore } from './store';
import { useFormContext } from '../Form/context';
import { type FormItemProps, FieldMode } from './interface';

const { Item, useFormInstance } = Form;

export const FormItem: <ValuesType = any, OptionType = any>(
  props: PropsWithChildren<FormItemProps<ValuesType, OptionType>>
) => React.ReactNode = observer((props) => {
  const {
    children,
    name,
    style,
    remoteOptions,
    dependencies,
    remoteOptionsDebounceProps = { wait: 600 },
    ...restProps
  } = props;

  const [updateKey, update] = useState({});

  const formStore = useFormContext();

  const form = useFormInstance();

  const forceUpdate = () => update({});

  const field = useMemo(() => {
    // @ts-expect-error
    return formStore.createField(name, new FieldStore(props, { ...formStore, ...form }, forceUpdate));
  }, [form, formStore, name, props]);

  useDebounceEffect(
    () => {
      field.fetchRemoteOptions();
    },
    [updateKey],
    remoteOptionsDebounceProps
  );

  useEffect(() => {
    return () => {
      // formStore.removeField(name);
    };
  }, [formStore, name]);

  if (field.mode === FieldMode.NODE) {
    return null;
  }

  return (
    <Item {...restProps} {...field.fieldProps} name={name}>
      {cloneElement(children, { ...field.childProps })}
    </Item>
  );
});
