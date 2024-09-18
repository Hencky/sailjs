import { Menu } from 'antd';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';

/** ===== pages ===== */
import Group from '@/pages/group';
import Plugins from '@/pages/plugins';
import Desctoy from '@/pages/destroy';
import Options from '@/pages/options';
import Instance from '@/pages/instance';
import ArrayName from '@/pages/arrayname';
import Depdendency from '@/pages/dependency';
import RemoteValues from '@/pages/remoteValues';

const list = [
  {
    label: '实例方法',
    key: 'instance',
    path: '/instance',
    element: <Instance />,
  },
  {
    label: '联动',
    key: 'dependency',
    path: '/dependency',
    element: <Depdendency />,
  },
  {
    label: '数据源',
    key: 'options',
    path: '/options',
    element: <Options />,
  },
  {
    label: '数组name',
    key: 'arrayname',
    path: '/arrayname',
    element: <ArrayName />,
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
    label: '分组',
    key: 'group',
    path: '/group',
    element: <Group />,
  },
  {
    label: '插件',
    key: 'plugins',
    path: '/plugins',
    element: <Plugins />,
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
