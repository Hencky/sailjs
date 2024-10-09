import { Menu } from 'antd';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';

import {
  List,
  Modal,
  Plugins,
  Options,
  Destroy,
  Simplify,
  EmptyItem,
  PropEffects,
  ItemInstance,
  ValueEffects,
  RemoteValues,
  GroupInstance,
  PropDependency,
  GroupContainer,
  ValueDependency,
  GroupDependency,
  ValueDependencyObj,
} from '@demos/core';
import { CollapsePlugin, SpacePlugin, FlexPlugin, CardPlugin } from '@demos/plugins';

const list = [
  {
    label: 'Item实例',
    key: 'instance',
    path: '/instance',
    element: <ItemInstance />,
  },
  {
    label: '联动',
    key: 'dependency',
    path: '/dependency',
    element: (
      <div>
        <ValueEffects />
        <PropEffects />
        <ValueDependency />
        <ValueDependencyObj />
        <PropDependency />
      </div>
    ),
  },
  {
    label: '数据源',
    key: 'options',
    path: '/options',
    element: <Options />,
  },
  {
    label: '远程值',
    key: 'remoteValues',
    path: '/remoteValues',
    element: <RemoteValues />,
  },
  {
    label: '卸载',
    key: 'destroy',
    path: '/destroy',
    element: <Destroy />,
  },
  {
    label: '分组实例',
    key: 'groupInstance',
    path: '/groupInstance',
    element: <GroupInstance />,
  },
  {
    label: '分组联动',
    key: 'groupDependency',
    path: '/groupDependency',
    element: <GroupDependency />,
  },
  {
    label: '分组容器',
    key: 'groupContainer',
    path: '/groupContainer',
    element: <GroupContainer />,
  },
  {
    label: '表单插件',
    key: 'plugins',
    path: '/plugins',
    element: <Plugins />,
  },
  {
    label: '容器插件',
    key: 'containerPlugins',
    path: '/containerPlugins',
    element: (
      <div>
        {/* <CollapsePlugin /> */}
        {/* <SpacePlugin /> */}
        {/* <FlexPlugin /> */}
        <CardPlugin />
      </div>
    ),
  },
  {
    label: '弹框',
    key: 'modal',
    path: '/modal',
    element: <Modal />,
  },
  {
    label: '列表',
    key: 'formlist',
    path: '/formlist',
    element: <List />,
  },
  {
    label: '空ITEM',
    key: 'emptyitem',
    path: '/emptyitem',
    element: <EmptyItem />,
  },
  {
    label: '简化取值',
    key: 'simplify',
    path: '/simplify',
    element: <Simplify />,
  },
];

const Layout = () => {
  const renderRoutes = () => {
    return list.map((item) => {
      const { label, key, ...rest } = item;
      return <Route key={key} {...rest} />;
    });
  };

  const renderMenus = () => {
    return list.map((item) => {
      const { key, label, path } = item;
      return { key, label: <Link to={path}>{label}</Link> };
    });
  };

  return (
    <BrowserRouter>
      <Menu mode="horizontal" items={renderMenus()} style={{ marginBottom: 24 }} />
      <Routes>{renderRoutes()}</Routes>
    </BrowserRouter>
  );
};

export default Layout;
