import { Card, Space, Row, Collapse } from 'antd';
// import { Collapse } from './Collapse';
// import type { CardProps, SpaceProps, RowProps } from 'antd';
// import type { CollapseProps } from './Collapse';

export const DEFAULT_CONTAINER_PLUGINS = {
  card: {
    component: <Card />,
    defaultComponentProps: {},
  },
  collapse: {
    component: <Collapse />,
    defaultComponentProps: {},
  },
  'collapse.panel': {
    // @ts-ignore
    component: <Collapse.Panel />,
    defaultComponentProps: {},
  },
  space: {
    component: <Space />,
    defaultComponentProps: {},
  },
  // flex: {
  //   component: Flex,
  //   defaultComponentProps: {} as FlexProps,
  // },
  row: {
    component: <Row />,
    defaultComponentProps: {},
  },
};

export type DefaultContainerPluginsType = typeof DEFAULT_CONTAINER_PLUGINS;
