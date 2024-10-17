import { FormGroup } from '../FormGroup';
import { FormItem } from '../FormItem';
import { FormList } from '../FormList';
import { Form as IForm } from './Form';
import { useForm } from './useForm';

export * from './store';
export * from './context';
export * from './useForm';
export * from './interface';

export type InternalFormType = typeof IForm;

export interface FormType extends InternalFormType {
  Item: typeof FormItem;
  List: typeof FormList;
  Group: typeof FormGroup;
  useForm: typeof useForm;
}

const Form: FormType = IForm as FormType;

Form.Item = FormItem;
Form.List = FormList;
Form.Group = FormGroup;
Form.useForm = useForm;

export { Form };
