import { Form, useForm, FormGroup } from '@sailjs/core';
import { DEFAULT_COMPONENT_PLUGINS, DEFAULT_CONTAINER_PLUGINS } from '../../src';

export function CombineDemo() {
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
            container: 'card',
            span: 12,
            labelCol: { style: { width: 40 } },
            items: [
              {
                name: 'group1-1',
                container: 'row',
                containerProps: {
                  gutter: [24, 24],
                },
                items: [
                  {
                    name: 'a',
                    label: 'a',
                    component: 'input',
                    componentProps: {},
                  },
                  {
                    name: 'b',
                    label: 'b',
                    component: 'input',
                    reactions: [
                      {
                        dependencies: ['a'],
                        result: {
                          value: '$deps[0]',
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: 'group2',
            span: 12,
            container: 'card',
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
