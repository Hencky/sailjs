import { Fragment } from 'react';
import { Menu } from 'antd';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';

/** ===== pages ===== */
import Options from '@/pages/options';
import Instance from '@/pages/instance';
import Depdendency from '@/pages/dependency';

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
    <Fragment>
      <BrowserRouter>
        <Menu mode="horizontal" items={renderMenus()} style={{ marginBottom: 24 }} />
        <Routes>{renderRoutes()}</Routes>
      </BrowserRouter>
    </Fragment>
  );
};

export default Layout;
