import { useContext } from 'react';
import { ConfigProvider } from 'antd';

export const useConfigProvoder = () => {
  return useContext(ConfigProvider.ConfigContext);
};

export const usePrefixCls = (className: string) => {
  const { getPrefixCls } = useConfigProvoder();
  return getPrefixCls(className);
};
