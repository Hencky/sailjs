import { PropsWithChildren, cloneElement, useEffect, useMemo, useState, isValidElement } from 'react';
import { omit } from 'radash';
import { Form, Col } from 'antd';
import { toArray } from '@sailjs/shared';
import { useDebounceEffect } from 'ahooks';
import { observer } from 'mobx-react-lite';
import { FieldStore } from './store';
import { commonKeys, FieldMode } from '../Base';
import { useFormContext } from '../Form/context';
import { useFormGroupContext } from '../FormGroup';
import { useFormListContext } from '../FormList/context';
import type { PluginsType } from '@sailjs/shared';
import type { FormItemProps } from './interface';

const { Item, useFormInstance } = Form;

export const FormItem = observer(
  <Values, P extends PluginsType = any>(props: PropsWithChildren<FormItemProps<Values, P>>): React.ReactNode => {
    const { name, children } = props;

    const restProps = omit(props, [
      ...commonKeys,
      'options',
      'remoteOptions',
      'reactions',
      'component',
      'componentProps',
    ]);

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
      <Item<Values> {...restProps} {...field.fieldProps} name={name}>
        {Com ? (
          <Com {...defaultComponentProps} {...field.componentProps} {...field.childProps} />
        ) : isValidElement(children) ? (
          cloneElement(children, { ...field.childProps })
        ) : (
          children
        )}
      </Item>
    );

    if (field.span === null || groupStore?.container === null) {
      return element;
    }

    return (
      <Col {...field.colProps} span={field.span!}>
        {element}
      </Col>
    );
  }
);
