import { cloneElement, useMemo, useEffect, Fragment } from 'react';
import { Row } from 'antd';
import { observer } from 'mobx-react-lite';
import { FormItem } from '../FormItem';
import { GroupStore } from './store';
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

  const renderFields = (items: FormGroupProps<Values, P>['items']) => {
    return (
      <Fragment>
        {items?.map((item) => {
          const { children } = item;
          return (
            <FormItem<Values, P> key={toCompareName(item.name as string)} {...item}>
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

  return (
    <FormGroupContext.Provider value={group}>
      {container ? cloneElement(container as any, group.containerProps, element) : element}
    </FormGroupContext.Provider>
  );
});
