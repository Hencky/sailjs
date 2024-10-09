import { computed, makeObservable, observable } from 'mobx';
import { isString } from 'radash';
import { BaseStore, BaseProps } from '../Base';
import type { FormStore } from '../Form/store';
import type { FormGroupProps } from './interface';

export class GroupStore<Values = any, P = any> extends BaseStore implements Omit<FormGroupProps, 'form'>, BaseProps {
  name?: FormGroupProps['name'];

  items?: FormGroupProps['items'];

  rowProps?: FormGroupProps['rowProps'];

  /** 容器 */
  container?: FormGroupProps['container'];
  /** 容器属性 */
  containerProps?: FormGroupProps['containerProps'];

  constructor(
    props: FormGroupProps,
    getFormStore: () => FormStore<Values>,
    getGroupStore: () => GroupStore<Values, P>
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
      items: observable.shallow,
      container: observable,
      containerProps: observable.shallow,
      containerPlugin: computed,
    });
  }

  get groupProps() {
    return {
      items: this.items,
    };
  }

  // 插件
  get containerPlugin() {
    if (isString(this.container)) {
      return this.getFormStore().plugins[this.container];
    }

    return null;
  }
}
