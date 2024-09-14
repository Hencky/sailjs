class PluginStore<T> {
  plugins = {} as any;

  register<Name extends string, Component, ComponentProps>(
    name: Name extends keyof T ? never : Name,
    component: Component,
    componentProps?: ComponentProps
  ): PluginStore<T & Record<Name, { component: Component; componentProps?: ComponentProps }>> {
    this.plugins[name] = {
      component,
      defaultComponentProps: componentProps,
    };

    return this.plugins;
  }

  getPlugins(): T {
    return this.plugins;
  }

  getPlugin<Name extends keyof T>(name: Name): T[Name] {
    return this.plugins[name];
  }
}

export const pluginStore = new PluginStore();

import { Input, InputProps, Select, SelectProps } from 'antd';

const createStore = () => {
  return pluginStore
    .register<'input', typeof Input, InputProps>('input', Input)
    .register<'select', typeof Select, SelectProps>('select', Select);
};

export const store = createStore();
