import { useMemo } from 'react';
import { Row } from 'antd';
import { observer } from 'mobx-react-lite';
import { FormItem } from '../FormItem';
import { toCompareName } from '../utils';
import { FormGroupContext } from './context';
import { useFormContext } from '../Form/context';
import type { RowProps } from 'antd/lib/row';
import type { FormItemProps } from '../FormItem';

export interface FormGruopProps<ValuesType = any>
  extends Pick<
      FormItemProps,
      | 'mode'
      | 'help'
      | 'colon'
      | 'layout'
      | 'variant'
      | 'labelCol'
      | 'labelAlign'
      | 'wrapperCol'
      | 'validateDebounce'
      | 'remoteOptionsDebounceProps'
      | 'span'
      | 'offset'
      | 'push'
      | 'pull'
      | 'order'
      | 'flex'
    >,
    RowProps {
  fields: FormItemProps<ValuesType>[];
}

export const FormGroup = observer((props: FormGruopProps) => {
  const { fields, ...rowProps } = props;

  const formContext = useFormContext();

  const {
    span,
    offset,
    push,
    pull,
    order,
    flex,
    colon,
    layout,
    labelCol,
    labelAlign,
    wrapperCol,
    variant,
    mode,
    remoteOptionsDebounceProps,
  } = Object.assign({}, formContext, props);

  const groupContext = useMemo(() => {
    return {
      span,
      offset,
      push,
      pull,
      order,
      flex,
      colon,
      layout,
      labelCol,
      labelAlign,
      wrapperCol,
      mode,
      variant,
      remoteOptionsDebounceProps,
    };
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
