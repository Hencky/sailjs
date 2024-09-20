import { useContext, useMemo } from 'react';
import { Form as AForm } from 'antd';
import { toArray } from '@sailjs/shared';
import { FormListContext } from './context';
import type { FormListProps } from 'antd/lib/form/FormList';

const { List } = AForm;

export const FormList = (props: FormListProps) => {
  const { name } = props;

  const listCtx = useContext(FormListContext);

  const contextValue = useMemo(() => {
    return {
      name: listCtx.name ? [...toArray(listCtx.name), ...toArray(name)] : name,
    };
  }, [listCtx.name, name]);

  return (
    <FormListContext.Provider value={contextValue}>
      <List {...props} />
    </FormListContext.Provider>
  );
};
