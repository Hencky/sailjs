import { FC, PropsWithChildren, cloneElement, useMemo, useState } from 'react';
import { Form } from 'antd';
import { useDebounceEffect } from 'ahooks';
import { observer } from 'mobx-react-lite';
import { FieldStore } from './store';
import { useFormContext } from '../Form/context';
import { FormItemProps, FieldMode } from './interface';

const { Item, useFormInstance } = Form;

function IFormItem<ValuesType = any, OptionType = any>(
  props: PropsWithChildren<FormItemProps<ValuesType, OptionType>>
) {
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
    return formStore.createField<string | number | symbol, OptionType>(
      name,
      new FieldStore(props, { ...formStore, ...form }, forceUpdate)
    );
  }, [form, formStore, name, props]);

  useDebounceEffect(
    () => {
      field.makeRemoteOptions();
    },
    [updateKey],
    remoteOptionsDebounceProps
  );

  if (field.mode === FieldMode.NODE) {
    return null;
  }

  const itemStyle: React.CSSProperties = style || {};

  if (field.mode === FieldMode.HIDDEN) {
    itemStyle.display = 'none';
  }

  return (
    <Item {...restProps} style={itemStyle} {...field.fieldProps} name={name}>
      {cloneElement(children, { ...field.childProps })}
    </Item>
  );
}

export const FormItem = observer(IFormItem);
