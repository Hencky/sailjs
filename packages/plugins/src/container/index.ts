import { Card, Flex, Space } from 'antd';
import { Collapse } from './Collapse';
import type { CardProps, FlexProps, SpaceProps } from 'antd';
import type { CollapseProps } from './Collapse';

export const DEFAULT_CONTAINER_PLUGINS = {
  card: {
    component: Card,
    defaultComponentProps: {} as CardProps,
  },
  collapse: {
    component: Collapse,
    defaultComponentProps: {} as CollapseProps,
  },
  space: {
    component: Space,
    defaultComponentProps: {} as SpaceProps,
  },
  flex: {
    component: Flex,
    defaultComponentProps: {} as FlexProps,
  },
} as const;

export type DefaultContainerPluginsType = typeof DEFAULT_CONTAINER_PLUGINS;
