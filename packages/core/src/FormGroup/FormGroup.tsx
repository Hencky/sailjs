import { useMemo, useEffect } from 'react';
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

export const FormGroup = observer(<ValuesType, P extends PluginsType = any>(props: FormGroupProps<ValuesType, P>) => {
  const { name } = props;

  const formStore = useFormContext();
  const groupStore = useFormGroupContext();

  const group = useMemo(() => {
    return formStore!.createGroup(
      name,
      new GroupStore<ValuesType, P>(
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

  const renderFields = (items: FormGroupProps<ValuesType, P>['items']) => {
    return items?.map((item) => {
      const { children } = item;
      return (
        <FormItem<ValuesType, P> key={toCompareName(item.name as string)} {...item}>
          {/* @ts-expect-error */}
          {children}
        </FormItem>
      );
    });
  };

  let element;
  if (group.groupProps.items) {
    element = (
      <Row {...group.groupProps}>{renderFields(group.groupProps.items as FormGroupProps<ValuesType, P>['items'])}</Row>
    );
  } else {
    element = props.children;
  }

  return <FormGroupContext.Provider value={group}>{element}</FormGroupContext.Provider>;
});
