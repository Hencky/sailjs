import { Form, useForm, FormGroup } from '@sailjs/core';
import { DEFAULT_COMPONENT_PLUGINS, DEFAULT_CONTAINER_PLUGINS } from '../../..';

export function SpacePlugin() {
  const [form] = useForm({ plugins: Object.assign({}, DEFAULT_COMPONENT_PLUGINS, DEFAULT_CONTAINER_PLUGINS) });

  return (
    <Form
      form={form}
      onValuesChange={(_, values) => {
        console.log('values', values);
      }}
    >
      <FormGroup
        container="space"
        containerProps={{
          direction: 'vertical',
          size: 'middle',
          style: { display: 'flex' },
        }}
        items={[
          {
            name: 'group1',
            span: 24,
            items: [
              {
                name: 'a',
                label: 'a',
                component: 'input',
              },
              {
                name: 'b',
                label: 'b',
                component: 'input',
              },
            ],
          },
          {
            name: 'group2',
            span: 24,
            items: [
              {
                name: 'c',
                label: 'c',
                component: 'input',
              },
              {
                name: 'd',
                label: 'd',
                component: 'input',
              },
            ],
          },
        ]}
      />
    </Form>
  );
}
