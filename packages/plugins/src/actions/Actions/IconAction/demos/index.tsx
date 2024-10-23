import { Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { BaseIcon as Icon } from '../BaseIcon';

export const BaseIcon = () => {
  return (
    <Space>
      <Icon icon={<DeleteOutlined />} />
      <Icon icon={<DeleteOutlined />} loading />
      <Icon icon={<DeleteOutlined />} disabled />
      <Icon icon={<DeleteOutlined />} text="删除" />
      <Icon icon={<DeleteOutlined />} text="删除" textPosition="start" />
    </Space>
  );
};
