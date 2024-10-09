import { cloneElement, useMemo, useEffect, Fragment } from 'react';
import { Row } from 'antd';
import { observer } from 'mobx-react-lite';
import { FormItem } from '../FormItem';
import { GroupStore } from './store';
import { FieldMode } from '../Base';
import { toCompareName } from '../utils';
import { FormGroupContext } from './context';
import { useFormContext } from '../Form/context';
import { useFormGroupContext } from './context';
import type { PluginsType } from '@sailjs/shared';
import type { FormGroupProps } from './interface';

export const FormGroup = observer(<Values, P extends PluginsType = any>(props: FormGroupProps<Values, P>) => {
  const { name } = props;

  const formStore = useFormContext();
  const groupStore = useFormGroupContext();

  const group = useMemo(() => {
    return formStore!.createGroup(
      name,
      new GroupStore<Values, P>(
        props,
        () => formStore,
        () => groupStore
      )
    );
  }, []);

  useEffect(() => {
    formStore.addGroup(name, group);
    return () => {
      formStore.removeGroup(name);
    };
  }, []);

  const isGroup = (item: any): item is FormGroupProps<Values, P> => {
    return !!item.container || !!item.items;
  };

  const renderFields = (items: FormGroupProps<Values, P>['items']) => {
    return (
      <Fragment>
        {items?.map((item, idx) => {
          const { children } = item;

          if (isGroup(item)) {
            return (
              <FormGroup key={toCompareName(item.name as string) || idx} {...(item as FormGroupProps<Values, P>)} />
            );
          }

          return (
            <FormItem<Values, P> key={toCompareName(item.name as string) || idx} {...item}>
              {/* @ts-expect-error */}
              {children}
            </FormItem>
          );
        })}
      </Fragment>
    );
  };

  // ===== children =====
  const element = group.groupProps.items
    ? renderFields(group.groupProps.items as FormGroupProps<Values, P>['items'])
    : props.children;

  // ===== 容器  ======
  let container;
  if (group.containerPlugin) {
    const { component: Com, defaultComponentProps } = group.containerPlugin;
    container = <Com {...defaultComponentProps} {...group.containerProps} />;
  } else if (group.container) {
    container = group.container;
  } else {
    container = <Row {...group.rowProps}></Row>;
  }

  if (group.mode === FieldMode.HIDDEN) {
    container = <div style={{ display: 'none' }}></div>;
  }

  if (group.mode === FieldMode.NODE) {
    return null;
  }

  return (
    <FormGroupContext.Provider value={group}>
      {container ? cloneElement(container as any, group.containerProps, element) : element}
    </FormGroupContext.Provider>
  );
});
