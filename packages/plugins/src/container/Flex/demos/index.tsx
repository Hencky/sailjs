import { Form, useForm, FormGroup } from '@sailjs/core';
import { DEFAULT_COMPONENT_PLUGINS, DEFAULT_CONTAINER_PLUGINS } from '../../..';

export function FlexPlugin() {
  const [form] = useForm({ plugins: Object.assign({}, DEFAULT_COMPONENT_PLUGINS, DEFAULT_CONTAINER_PLUGINS) });

  return (
    <Form
      form={form}
      onValuesChange={(_, values) => {
        console.log('values', values);
      }}
    >
      <FormGroup
        container="flex"
        containerProps={{
          vertical: false,
        }}
      >
        <FormGroup
          name="group1"
          items={[
            {
              name: 'a',
              label: 'flexA',
              component: 'input',
            },
            {
              name: 'b',
              label: 'flexB',
              component: 'input',
            },
          ]}
        />
        <FormGroup
          name="group2"
          items={[
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
          ]}
        />
      </FormGroup>
    </Form>
  );
}
