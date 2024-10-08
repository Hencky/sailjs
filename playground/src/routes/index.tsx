import { Menu } from 'antd';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';

/** ===== pages ===== */
import Modal from '@/pages/modal';
import Plugins from '@/pages/plugins';
import Desctoy from '@/pages/destroy';
import FormList from '@/pages/formlist';
import FormItem from '@/pages/formitem';

import {
  ItemInstance,
  Options,
  ValueEffects,
  PropEffects,
  ValueDependency,
  ValueDependencyObj,
  PropDependency,
  RemoteValues,
  Simplify,
  GroupInstance,
  GroupDependency,
} from '@demos/core';

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
    element: <Desctoy />,
  },
  {
    label: '分组实例',
    key: 'groupInstance',
    path: '/groupInstance',
    element: <GroupInstance />,
  },
  {
    label: '分组实例',
    key: 'groupDependency',
    path: '/groupDependency',
    element: <GroupDependency />,
  },
  {
    label: '插件',
    key: 'plugins',
    path: '/plugins',
    element: <Plugins />,
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
    element: <FormList />,
  },
  {
    label: '空ITEM',
    key: 'formitem',
    path: '/formitem',
    element: <FormItem />,
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
