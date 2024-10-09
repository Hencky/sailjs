import { Form, useForm, FormGroup } from '@sailjs/core';
import { DEFAULT_COMPONENT_PLUGINS, DEFAULT_CONTAINER_PLUGINS } from '../../..';

export function CardPlugin() {
  const [form] = useForm({ plugins: Object.assign({}, DEFAULT_COMPONENT_PLUGINS, DEFAULT_CONTAINER_PLUGINS) });

  return (
    <Form
      form={form}
      onValuesChange={(_, values) => {
        console.log('values', values);
      }}
    >
      <FormGroup
        container="card"
        containerProps={{
          title: '卡片面板',
        }}
        items={[
          {
            name: 'a',
            label: 'a',
            component: 'input',
          },
        ]}
      />

      <FormGroup
        container="card"
        containerProps={{
          title: '嵌套卡片',
        }}
        items={[
          {
            name: 'b',
            label: 'b',
            component: 'input',
          },
          {
            name: 'g-1',
            container: 'card',
            containerProps: {
              title: '嵌套卡片-1',
            },
            items: [
              {
                name: 'c',
                label: 'c',
                component: 'input',
              },
            ],
          },
        ]}
      />
    </Form>
  );
}
