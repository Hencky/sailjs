import { makeObservable, observable } from 'mobx';
import { BaseStore, BaseProps } from '../Base';
import type { FormStore } from '../Form/store';
import type { FormGroupProps } from './interface';

export class GroupStore<ValuesType = any, P = any>
  extends BaseStore
  implements Omit<FormGroupProps, 'form'>, BaseProps
{
  name?: FormGroupProps['name'];

  fields?: FormGroupProps['fields'];

  /** 垂直对齐方式 */
  align?: FormGroupProps['align'];
  /** 栅格间隔，可以写成像素值或支持响应式的对象写法来设置水平间隔 { xs: 8, sm: 16, md: 24}。或者使用数组形式同时设置 [水平间距, 垂直间距] */
  gutter?: FormGroupProps['gutter'];
  /** 水平排列方式 */
  justify?: FormGroupProps['justify'];
  /** 是否自动换行 */
  wrap?: FormGroupProps['wrap'];

  constructor(
    props: FormGroupProps,
    getFormStore: () => FormStore<ValuesType>,
    getGroupStore: () => GroupStore<ValuesType, P>
  ) {
    super(getFormStore, getGroupStore);

    Object.keys(props).forEach((key) => {
      // @ts-expect-error
      this[key] = props[key];
    });

    super.makeObservable();
    this.makeObservable();
  }

  makeObservable() {
    makeObservable(this, {
      fields: observable.shallow,
      align: observable.ref,
      gutter: observable,
      justify: observable.ref,
      wrap: observable.ref,
    });
  }

  get groupProps() {
    return {
      fields: this.fields,
      align: this.align,
      gutter: this.gutter,
      justify: this.justify,
      wrap: this.wrap,
    };
  }
}
