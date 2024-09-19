import { useModal, useModalForm, FormGroup } from '@sailjs/core';
import { Button } from 'antd';
import { plugins, CustomPluginsType } from '../plugins/plugins';

const SaveModal = () => {
  return (
    <FormGroup<any, CustomPluginsType>
      items={[
        {
          name: 'a1',
          label: 'a1',
          component: 'input',
          reactions: [
            {
              effects: ['a2'],
              result: {
                value: `$self + 'xxx'`,
              },
            },
          ],
        },
        { name: 'a2', label: 'a2', component: 'input', rules: [{ required: true, message: 'a2必填' }] },
      ]}
    />
  );
};

export default () => {
  const [modal, { open: openModal, close: closeModal }] = useModal();
  const [modalForm, { open: openModalForm, close: closeModalForm }] = useModalForm({ plugins });

  return (
    <div>
      {modal}
      {modalForm}

      <Button
        onClick={() =>
          openModal({
            title: '弹框',
            width: 600,
            children: '弹框内容',
            onCancel: () => {
              console.log('onCancel');
            },
            onOk: () => {
              console.log('onOk');
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
            width: 600,
            children: <SaveModal />,
            onCancel: () => {
              console.log('onCancel');
            },
            onOk: (e, ctx) => {
              console.log('onOk', e, ctx);
              closeModalForm();
            },
          })
        }
      >
        打开弹框表单
      </Button>
    </div>
  );
};
