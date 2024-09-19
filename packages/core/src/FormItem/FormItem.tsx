import { PropsWithChildren, cloneElement, useEffect, useMemo, useState } from 'react';
import { Form, Col } from 'antd';
import { useDebounceEffect } from 'ahooks';
import { observer } from 'mobx-react-lite';
import { FieldMode } from '../Base';
import { FieldStore } from './store';
import { useFormContext } from '../Form/context';
import { useFormGroupContext } from '../FormGroup';
import type { PluginsType } from '../plugins';
import type { FormItemProps } from './interface';

const { Item, useFormInstance } = Form;

export const FormItem = observer(
  <ValuesType, P extends PluginsType = any>(
    props: PropsWithChildren<FormItemProps<ValuesType, P>>
  ): React.ReactNode => {
    const { name, children } = props;

    const [updateKey, update] = useState({});

    const formStore = useFormContext();
    const groupStore = useFormGroupContext();

    const form = useFormInstance();

    const forceUpdate = () => update({});

    const field = useMemo(() => {
      return formStore.createField(
        name as string,
        new FieldStore<ValuesType, P>(
          props,
          form,
          () => formStore,
          () => groupStore,
          forceUpdate
        )
      );
    }, []);

    const { remoteOptionsDebounceProps } = field;

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

    const { defaultComponentProps, component: Com } = field.plugin;

    const element = (
      <Item<ValuesType> {...field.fieldProps} name={name}>
        {Com ? (
          <Com {...field.childProps} {...defaultComponentProps} {...field.componentProps} />
        ) : (
          // @ts-expect-error
          cloneElement(children, { ...field.childProps })
        )}
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
  }
);
