import { Input } from 'antd';
import { DEFAULT_COMPONENT_PLUGINS } from '../../../plugins/src/index';

export const plugins = Object.assign({}, DEFAULT_COMPONENT_PLUGINS, {
  input2: {
    component: <Input />,
    defaultComponentProps: { showCount: true },
  },
});

export type CustomPluginsType = typeof plugins;

export { DEFAULT_COMPONENT_PLUGINS };
