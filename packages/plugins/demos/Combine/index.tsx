import { Form, useForm, FormGroup } from '@sailjs/core';
import { DEFAULT_PLUGINS, DefaultPluginsType } from '../../src';

export function CombineDemo() {
  const [form] = useForm({ plugins: DEFAULT_PLUGINS });

  return (
    <Form
      form={form}
      onValuesChange={(_, values) => {
        console.log('values', values);
      }}
    >
      <FormGroup<any, DefaultPluginsType>
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
            containerProps: {
              title: '卡片',
            },
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
                    componentProps: {
                      allowClear: true,
                    },
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
