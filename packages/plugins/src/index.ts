export * from './form';
export * from './container';

import { DEFAULT_COMPONENT_PLUGINS, DefaultComponentPluginsType } from './form';
import { DEFAULT_CONTAINER_PLUGINS, DefaultContainerPluginsType } from './container';

export const DEFAULT_PLUGINS = Object.assign({}, DEFAULT_COMPONENT_PLUGINS, DEFAULT_CONTAINER_PLUGINS);

export type DefaultPluginsType = DefaultComponentPluginsType & DefaultContainerPluginsType;
