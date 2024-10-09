import { Form, useForm, FormGroup } from '@sailjs/core';
import { DEFAULT_COMPONENT_PLUGINS, DEFAULT_CONTAINER_PLUGINS } from '../../..';

export function CollapsePlugin() {
  const [form] = useForm({ plugins: Object.assign({}, DEFAULT_COMPONENT_PLUGINS, DEFAULT_CONTAINER_PLUGINS) });

  return (
    <Form
      form={form}
      onValuesChange={(_, values) => {
        console.log('values', values);
      }}
    >
      <FormGroup
        container="collapse"
        containerProps={{
          title: '折叠面板',
          defaultActiveKey: ['1'],
          items: [
            {
              label: '第一组',
              key: '1',
              items: [
                {
                  name: 'a',
                  label: 'a',
                  component: 'input',
                },
              ],
            },
            {
              label: '第二组',
              key: '2',
              items: [
                {
                  name: 'b',
                  label: 'b',
                  component: 'input',
                },
              ],
            },
            {
              label: '第三组',
              key: '3',
              items: [
                {
                  name: 'c',
                  label: 'c',
                  component: 'input',
                },
              ],
            },
          ],
        }}
      />
    </Form>
  );
}
