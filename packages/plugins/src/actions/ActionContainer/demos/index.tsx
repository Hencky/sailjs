import { Button, Space } from 'antd';
import { ActionContainer } from '@voyagejs/plugins';

export const ActionContainerDemo = () => {
  return (
    <Space style={{ display: 'flex' }}>
      <ActionContainer
        tooltip="提示"
        onClick={() => {
          console.log('ok');
        }}
      >
        <Button>提示1</Button>
      </ActionContainer>

      <ActionContainer
        tooltip={{ placement: 'bottom', title: '提示' }}
        onClick={() => {
          console.log('ok');
        }}
      >
        <Button>提示2</Button>
      </ActionContainer>

      <ActionContainer
        confirm="确认？"
        onClick={() => {
          console.log('ok');
        }}
      >
        <Button>二次确认1</Button>
      </ActionContainer>

      <ActionContainer
        confirm={{ title: '确认?', placement: 'bottom' }}
        onClick={() => {
          console.log('ok');
        }}
      >
        <Button>二次确认2</Button>
      </ActionContainer>

      <ActionContainer
        modalConfirm="确认？"
        onClick={() => {
          console.log('ok');
        }}
      >
        <Button>弹框确认1</Button>
      </ActionContainer>

      <ActionContainer
        modalConfirm={{ title: '确认?', content: '提示文案' }}
        onClick={() => {
          console.log('ok');
        }}
      >
        <Button>弹框确认2</Button>
      </ActionContainer>

      <ActionContainer
        tooltip="提示"
        confirm="确认？"
        onClick={() => {
          console.log('ok');
        }}
      >
        <Button>组合使用1</Button>
      </ActionContainer>

      <ActionContainer
        tooltip="提示"
        modalConfirm="确认？"
        onClick={() => {
          console.log('ok');
        }}
      >
        <Button>组合使用2</Button>
      </ActionContainer>

      <ActionContainer
        disabled
        onClick={() => {
          console.log('ok');
        }}
      >
        <Button>禁用</Button>
      </ActionContainer>

      <ActionContainer
        render={false}
        onClick={() => {
          console.log('ok');
        }}
      >
        <Button>不渲染</Button>
      </ActionContainer>
    </Space>
  );
};
