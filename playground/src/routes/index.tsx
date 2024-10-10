import { Menu } from 'antd';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';

import 'antd/dist/antd.css';

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
import { CollapsePlugin, SpacePlugin, FlexPlugin, CardPlugin, CombineDemo } from '@demos/plugins';

const list = [
  {
    label: 'Item 表单项',
    path: '/item',
    children: [
      {
        path: '/instance',
        label: '实例',
        element: <ItemInstance />,
      },
      {
        path: '/options',
        label: '数据源',
        element: <Options />,
      },
      {
        path: '/destroy',
        label: '卸载',
        element: <Destroy />,
      },
      {
        path: '/empty',
        label: '空Item',
        element: <EmptyItem />,
      },
    ],
  },
  {
    label: 'Form 表单',
    path: '/form',
    children: [
      {
        path: '/remotevalues',
        label: '异步数据源',
        element: <RemoteValues />,
      },
      {
        label: '简化取值',
        path: '/simplify',
        element: <Simplify />,
      },
    ],
  },
  {
    label: 'Group 表单组',
    path: '/group',
    children: [
      {
        label: '实例',
        path: '/instance',
        element: <GroupInstance />,
      },
      {
        label: '联动',
        path: '/deps',
        element: <GroupDependency />,
      },
      {
        label: '容器',
        path: '/container',
        element: <GroupContainer />,
      },
    ],
  },
  {
    label: 'List 列表',
    path: '/formlist',
    element: <List />,
  },

  {
    label: '表单项联动',
    path: '/dependency',
    children: [
      {
        label: '值联动-主动',
        path: '/value-effects',
        element: <ValueEffects />,
      },
      {
        label: '值联动-被动',
        path: '/value-deps',
        element: <ValueDependency />,
      },
      {
        label: '值联动-被动-复杂name',
        path: '/value-deps-obj',
        element: <ValueDependencyObj />,
      },
      {
        label: '属性联动-主动',
        path: '/prop-effects',
        element: <PropEffects />,
      },
      {
        label: '属性联动-被动',
        path: '/prop-deps',
        element: <PropDependency />,
      },
    ],
  },

  {
    label: '表单插件',
    path: '/plugins',
    element: <Plugins />,
  },
  {
    label: '容器插件',
    path: '/containerPlugins',
    children: [
      {
        path: '/combine',
        label: 'Combine',
        element: <CombineDemo />,
      },
      {
        path: '/card',
        label: 'Card',
        element: <CardPlugin />,
      },
      {
        path: '/collapse',
        label: 'Collapse',
        element: <CollapsePlugin />,
      },
      {
        path: '/space',
        label: 'Space',
        element: <SpacePlugin />,
      },
      {
        path: '/flex',
        label: 'Flex',
        element: <FlexPlugin />,
      },
    ],
  },
  {
    label: '弹框',
    path: '/modal',
    element: <Modal />,
  },
] as const;

const Layout = () => {
  const renderRoutes = (data: any, parentPath = '') => {
    return data?.map((item: any) => {
      const { children, path, ...rest } = item;
      const realPath = parentPath + path;
      if (children) {
        return renderRoutes(children, realPath);
      }
      return <Route key={realPath} {...rest} path={realPath} />;
    });
  };

  const renderMenus = (data: any, parentPath = '') => {
    return data?.map((item: any) => {
      const { label, children, path } = item;
      const realPath = parentPath + path;
      return {
        key: realPath,
        label: children ? label : <Link to={realPath}>{label}</Link>,
        children: renderMenus(children, realPath),
      };
    });
  };

  return (
    <BrowserRouter>
      <Menu mode="horizontal" items={renderMenus(list)} style={{ marginBottom: 24 }} />
      <div style={{ padding: 24 }}>
        <Routes>{renderRoutes(list)}</Routes>
      </div>
    </BrowserRouter>
  );
};

export default Layout;
