import { useMemo, useEffect, useState } from 'react';
import { Row } from 'antd';
import { observer } from 'mobx-react-lite';
import { FormItem } from '../FormItem';
import { GroupStore } from './store';
import { toCompareName } from '../utils';
import { FormGroupContext } from './context';
import { useFormContext } from '../Form/context';
import { useFormGroupContext } from './context';
import type { FormGroupProps } from './interface';

export const FormGroup = observer((props: FormGroupProps) => {
  const { name } = props;

  const [key, update] = useState(-1);

  const formStore = useFormContext();
  const groupStore = useFormGroupContext();

  const group = useMemo(() => {
    return formStore!.createGroup(
      name,
      new GroupStore(
        props,
        () => groupStore || formStore,
        () => update((k) => k + 1)
      )
    );
  }, []);

  useEffect(() => {
    formStore.addField(name, group);
    return () => {
      formStore.removeField(name);
    };
  }, []);

  const renderFields = (fields: FormGroupProps['fields']) => {
    return fields?.map((item) => {
      const { children } = item;
      return (
        <FormItem key={toCompareName(item.name)} {...item}>
          {/* @ts-expect-error */}
          {children}
        </FormItem>
      );
    });
  };

  let element;
  if (group.groupProps.fields) {
    element = (
      <Row {...group.groupProps} key={key}>
        {renderFields(group.groupProps.fields)}
      </Row>
    );
  } else {
    element = props.children;
  }

  return <FormGroupContext.Provider value={group}>{element}</FormGroupContext.Provider>;
});
