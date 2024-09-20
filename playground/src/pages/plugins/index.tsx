import { Fragment, useEffect } from 'react';
import { Divider, Button } from 'antd';
import { FormItem, Form, FormGroup, useForm } from '@sailjs/core';
import { plugins, type CustomPluginsType } from './plugins';

function Plugins() {
  const [form] = useForm({ plugins });

  useEffect(() => {
    const timer = setTimeout(() => {
      const formA = form.getField('a1');
      formA.componentProps.placeholder = 'aabbcc';

      const x1 = form.getField('x1');
      x1.value = '123';
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Fragment>
      <Form<any, CustomPluginsType>
        form={form}
        labelCol={{ style: { width: 50 } }}
        onValuesChange={(_, values) => {
          console.log('values', values);
        }}
      >
        <FormItem<any, CustomPluginsType> name={'a1'} label="a1" component="inputnumber" componentProps={{}} />
        <FormItem<any, CustomPluginsType>
          name={'a2'}
          label="a2"
          component="input"
          componentProps={{
            allowClear: true,
          }}
        />

        <FormItem<any, CustomPluginsType>
          name={'b'}
          label="b"
          component="select"
          componentProps={{ placeholder: '请选择xx' }}
          remoteOptions={async () => {
            return [
              { label: 'a', value: 'a' },
              { label: 'b', value: 'b' },
              { label: 'c', value: 'c' },
            ];
          }}
        />

        <Divider />
        <FormGroup<any, CustomPluginsType>
          span={24}
          labelCol={{ style: { width: 60 } }}
          name="group1"
          items={[
            {
              name: 'x1',
              label: 'x1',
              rules: [{ required: true, message: '请输入xx' }],
              component: 'input',
              componentProps: {
                placeholder: '请输入xx',
              },
            },
            {
              name: 'x2',
              label: 'x2',
              component: 'inputnumber',
              componentProps: {
                placeholder: '请输入数字',
                style: { width: '100%' },
              },
              reactions: [
                {
                  dependencies: ['a1'],
                  result: {
                    value: `$deps[0]`,
                  },
                },
              ],
            },
            {
              name: 'x3',
              label: 'x3',
              component: 'select',
              options: [
                { label: 'a', value: 'a' },
                { label: 'b', value: 'b' },
                { label: 'c', value: 'c' },
              ],
              componentProps: {
                style: { width: '100%' },
                placeholder: '请选择',
              },
            },
          ]}
        />
      </Form>

      <Button
        onClick={async () => {
          const values = await form.validateFields();
          console.log('values', values);
        }}
      >
        修改
      </Button>
    </Fragment>
  );
}

export default Plugins;
