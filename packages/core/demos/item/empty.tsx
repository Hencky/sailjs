import { Form, useForm, FormItem } from '@sailjs/core';

export const EmptyItem = () => {
  const [form] = useForm();
  return (
    <Form form={form}>
      {/* 空Item不报错 */}
      <FormItem shouldUpdate></FormItem>
    </Form>
  );
};
