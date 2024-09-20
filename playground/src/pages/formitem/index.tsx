import { Form, useForm, FormItem } from '@sailjs/core';
import { DEFAULT_COMPONENT_PLUGINS } from '@sailjs/plugins';

const List = () => {
  const [form] = useForm<typeof DEFAULT_COMPONENT_PLUGINS>({ plugins: DEFAULT_COMPONENT_PLUGINS });
  return (
    <Form
      form={form}
      onValuesChange={(changedFields, allFields) => {
        console.log(changedFields, allFields);
      }}
    >
      <FormItem shouldUpdate></FormItem>
    </Form>
  );
};

export default List;
