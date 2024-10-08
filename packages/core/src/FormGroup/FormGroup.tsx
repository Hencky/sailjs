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
  let element;
  if (group.groupProps.items) {
    element = renderFields(group.groupProps.items as FormGroupProps<Values, P>['items']);
  } else {
    element = props.children;
  }

  // ===== 容器, 默认为Row  ======
  let container: React.ReactNode = <Row {...group.groupProps}></Row>;

  if (group.container) {
    container = group.container;
  }

  const child = group.container === null ? element : cloneElement(container as any, group.containerProps, element);

  return <FormGroupContext.Provider value={group}>{child}</FormGroupContext.Provider>;
});
