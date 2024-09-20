import { FormList, Form, useForm, FormItem } from '@sailjs/core';
import { DEFAULT_COMPONENT_PLUGINS } from '@sailjs/plugins';
import { Card, Button } from 'antd';

const List = () => {
  const [form] = useForm<typeof DEFAULT_COMPONENT_PLUGINS>({ plugins: DEFAULT_COMPONENT_PLUGINS });
  return (
    <Form
      form={form}
      onValuesChange={(changedFields, allFields) => {
        console.log(changedFields, allFields);
      }}
    >
      <FormList name="list">
        {(fields, operation) => {
          const ele = fields.map((field, index) => {
            return <FormItem key={field.key} name={[field.name, 'name']} label={`姓名${index}`} component={'input'} />;
          });

          return (
            <Card>
              {ele}
              <Button onClick={() => operation.add()}>添加</Button>
            </Card>
          );
        }}
      </FormList>

      <Button
        onClick={() => {
          const first = form.getField(['list', 0, 'name']);
          first.value = '123';
        }}
      >
        单个实例
      </Button>

      <Button
        onClick={() => {
          form.values = {
            list: [{ name: '1' }, { name: '2' }, { name: '3' }],
          };
        }}
      >
        表单实例
      </Button>
    </Form>
  );
};

export default List;
