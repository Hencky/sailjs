import { Card, Flex, Space, Row } from 'antd';
import { Collapse } from './Collapse';
import type { CardProps, FlexProps, SpaceProps, RowProps } from 'antd';
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
  row: {
    component: Row,
    defaultComponentProps: {} as RowProps,
  },
} as const;

export type DefaultContainerPluginsType = typeof DEFAULT_CONTAINER_PLUGINS;
