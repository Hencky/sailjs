import { FC, PropsWithChildren, cloneElement, useMemo, useState } from 'react';
import { Form } from 'antd';
import { observer } from 'mobx-react-lite';
import { FieldStore } from './store';
import { useFormContext } from '../Form/context';
import { FormItemProps, FieldMode } from './interface';

const { Item, useFormInstance } = Form;

export const FormItem: FC<PropsWithChildren<FormItemProps>> = observer((props) => {
  const { children, name } = props;

  const [, update] = useState({});

  const formStore = useFormContext();

  const form = useFormInstance();

  const forceUpdate = () => update({});

  const field = useMemo(() => {
    return formStore.createField(name, new FieldStore(props, { ...formStore, ...form }, forceUpdate));
  }, [form, formStore, name, props]);

  if (field.mode === FieldMode.NODE) {
    return null;
  }

  const itemStyle: React.CSSProperties = {};

  if (field.mode === FieldMode.HIDDEN) {
    itemStyle.display = 'none';
  }

  return (
    <Item {...props} style={itemStyle} {...field.fieldProps}>
      {cloneElement(children, { ...field.childProps })}
    </Item>
  );
});
