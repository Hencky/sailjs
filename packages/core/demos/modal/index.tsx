import { sleep } from 'radash';
import { memo, useEffect } from 'react';
import { Button, Input, Select } from 'antd';
import { useModal, useModalForm, FormGroup } from '@sailjs/core';

const Content = () => {
  useEffect(() => {
    console.log('modal刷新');
  }, []);

  return <div>内容</div>;
};

const SaveModal = memo(() => {
  useEffect(() => {
    console.log('modalForm刷新');
  }, []);

  return (
    <FormGroup
      span={24}
      items={[
        {
          name: 'a1',
          label: 'a1',
          children: <Input />,
          reactions: [
            {
              effects: ['a2'],
              result: {
                value: `$self + 'xxx'`,
              },
            },
          ],
        },
        { name: 'a2', label: 'a2', children: <Input />, rules: [{ required: true, message: 'a2必填' }] },
        {
          name: 'a3',
          label: 'a3',
          children: <Select />,
          componentProps: { style: { width: '100%' } },
          remoteOptions: async () => {
            console.log('remoteOptions');
            return Promise.resolve([
              { label: 'a', value: 'a' },
              { label: 'b', value: 'b' },
            ]);
          },
        },
      ]}
    />
  );
});

export const Modal = () => {
  const [modal, { open: openModal, close: closeModal }] = useModal();
  const [modalForm, { open: openModalForm, close: closeModalForm }] = useModalForm();
  const [modalForm2, { open: openModalForm2, close: closeModalForm2 }] = useModalForm();

  return (
    <div>
      {modal}
      {modalForm}
      {modalForm2}

      <Button
        onClick={() =>
          openModal({
            title: '弹框',
            width: 600,
            children: <Content />,
            onCancel: () => {
              console.log('onCancel');
            },
            onOk: async () => {
              console.log('onOk');
              await sleep(2000);
              closeModal();
            },
          })
        }
      >
        打开弹框
      </Button>

      <Button
        onClick={() =>
          openModalForm({
            title: '弹框表单',
            width: 700,
            children: <SaveModal />,
            onCancel: () => {
              console.log('onCancel');
            },
            onOk: (e, ctx) => {
              console.log('onOk', e, ctx);
              // closeModalForm();

              openModalForm2({
                title: '弹框表单2',
                width: 600,
                children: <SaveModal />,
                onCancel: () => {
                  console.log('onCancel');
                },
                onOk: (e, ctx) => {
                  console.log('onOk', e, ctx);
                  closeModalForm2();
                  closeModalForm();
                },
              });
            },
          })
        }
      >
        打开弹框表单
      </Button>
    </div>
  );
};
