import { useMemo } from 'react';
import { Row } from 'antd';
import { pick } from 'radash';
import { observer } from 'mobx-react-lite';
import { FormItem } from '../FormItem';
import { toCompareName } from '../utils';
import { FormGroupContext } from './context';
import { BaseProps, commonKeys } from '../Base';
import { useFormContext } from '../Form/context';
import type { RowProps } from 'antd/lib/row';
import type { FormItemProps } from '../FormItem';

export interface FormGruopProps<ValuesType = any> extends Pick<FormItemProps, keyof BaseProps>, RowProps {
  fields: FormItemProps<ValuesType>[];
}

export const FormGroup = observer((props: FormGruopProps) => {
  const { fields, ...rowProps } = props;

  const formContext = useFormContext();

  const realProps = Object.assign({}, formContext, props);

  const groupContext = useMemo(() => {
    return { ...pick(realProps, commonKeys) };
  }, []);

  const renderFields = () => {
    return fields.map((item) => {
      const { children } = item;
      return (
        <FormItem key={toCompareName(item.name)} {...item}>
          {/* @ts-expect-error */}
          {children}
        </FormItem>
      );
    });
  };

  return (
    <FormGroupContext.Provider value={groupContext}>
      <Row {...rowProps}>{renderFields()}</Row>
    </FormGroupContext.Provider>
  );
});
