import { useModal } from '@sailjs/core';
import { Button } from 'antd';

export default () => {
  const [modal, { open, close }] = useModal();

  return (
    <div>
      {modal}

      <Button
        onClick={() =>
          open({
            title: '弹框',
            width: 600,
            children: '弹框内容',
            onCancel: () => {
              console.log('onCancel');
            },
            onOk: () => {
              console.log('onOk');
              close();
            },
          })
        }
      >
        打开弹框
      </Button>
    </div>
  );
};
