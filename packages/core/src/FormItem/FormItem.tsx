import { PropsWithChildren, cloneElement, useEffect, useMemo, useState } from 'react';
import { Form, Col } from 'antd';
import { useDebounceEffect } from 'ahooks';
import { observer } from 'mobx-react-lite';
import { FieldStore } from './store';
import { useFormContext } from '../Form/context';
import { useFormGroupContext } from '../FormGroup';
import { FieldMode } from '../Base';
import type { FormItemProps } from './interface';

const { Item, useFormInstance } = Form;

export const FormItem: <ValuesType = any, OptionType = any>(
  props: PropsWithChildren<FormItemProps<ValuesType, OptionType>>
) => React.ReactNode = observer((props) => {
  const { name, children } = props;

  const [updateKey, update] = useState({});

  const formStore = useFormContext();
  const groupStore = useFormGroupContext();

  const realProps = Object.assign({}, formStore, props);

  const form = useFormInstance();

  const forceUpdate = () => update({});

  const field = useMemo(() => {
    return formStore.createField(name, new FieldStore(props, form, () => groupStore || formStore, forceUpdate));
  }, []);

  const { remoteOptionsDebounceProps } = realProps;

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
    <Item {...field.fieldProps} name={name}>
      {/* @ts-expect-error */}
      {cloneElement(children, { ...field.childProps })}
    </Item>
  );

  if (field.colProps.span === null) {
    return element;
  }

  return (
    <Col {...field.colProps} span={field.colProps.span}>
      {element}
    </Col>
  );
});
