import { PropsWithChildren, cloneElement, useEffect, useMemo, useState } from 'react';
import { Form, Col } from 'antd';
import { useDebounceEffect } from 'ahooks';
import { observer } from 'mobx-react-lite';
import { toArray } from '@sailjs/shared';
import { FieldMode } from '../Base';
import { FieldStore } from './store';
import { useFormContext } from '../Form/context';
import { useFormGroupContext } from '../FormGroup';
import { useFormListContext } from '../FormList/context';
import type { PluginsType } from '@sailjs/shared';
import type { FormItemProps } from './interface';

const { Item, useFormInstance } = Form;

export const FormItem = observer(
  <Values, P extends PluginsType = any>(props: PropsWithChildren<FormItemProps<Values, P>>): React.ReactNode => {
    const { name, children } = props;

    const [updateKey, update] = useState({});

    const formStore = useFormContext();
    const groupStore = useFormGroupContext();
    const listCtx = useFormListContext();

    const form = useFormInstance();

    const forceUpdate = () => update({});

    const fieldName = listCtx.name ? [...toArray(listCtx.name), ...toArray(name)] : name;

    const field = useMemo(() => {
      return formStore.createField(
        fieldName as string,
        new FieldStore<Values, P>(
          { ...props, name: fieldName },
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
      formStore.addField(fieldName, field);
      return () => {
        formStore.removeField(fieldName);
      };
    }, []);

    if (field.mode === FieldMode.NODE) {
      return null;
    }

    const { defaultComponentProps, component: Com } = field.plugin;

    const element = (
      <Item<Values> {...field.fieldProps} name={name}>
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
