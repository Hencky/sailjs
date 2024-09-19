class PluginStore<T> {
  plugins = {} as any;

  register<Name extends string, Component, ComponentProps>(
    name: Name extends keyof T ? never : Name,
    component: Component,
    defaultComponentProps?: ComponentProps
  ): PluginStore<T & Record<Name, { component: Component; defaultComponentProps?: ComponentProps }>> {
    this.plugins[name] = {
      component,
      defaultComponentProps,
    };

    return this as PluginStore<T & Record<Name, { component: Component; defaultComponentProps?: ComponentProps }>>;
  }

  registerPlugins<P>(plugins: P): P {
    this.plugins = Object.assign(this.plugins, plugins);
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

// import { Input, InputProps, Select, SelectProps } from 'antd';

// export const createStore = (plugins: any) => {
//   return pluginStore
//     .register<'input', typeof Input, InputProps>('input', Input)
//     .register<'select', typeof Select, SelectProps>('select', Select)
//     .register<'select1', typeof Select, SelectProps>('select1', Select)
//     .register<'select2', typeof Select, SelectProps>('select2', Select)
//     .register<'select3', typeof Select, SelectProps>('select3', Select)
//     .getPlugins();
// };

// export const store = createStore();
