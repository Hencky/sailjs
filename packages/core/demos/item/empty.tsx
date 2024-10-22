import { Form, useForm, FormItem } from '@voyagejs/form';

export const EmptyItem = () => {
  const [form] = useForm();
  return (
    <Form form={form}>
      {/* 空Item不报错 */}
      <FormItem shouldUpdate></FormItem>
    </Form>
  );
};
