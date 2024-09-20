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
            return (
              <Card key={field.key} title={index + 1}>
                <FormItem name={[field.name, 'name']} label={`姓名${index}`} component={'input'} />

                <FormList name={[field.name, 'childList']}>
                  {(childFields, childOperation) => {
                    const childEle = childFields.map((childField, childIndex) => {
                      console.log('childField', childField);

                      return (
                        <FormItem
                          key={childField.key}
                          name={[childField.name, 'name']}
                          label={`child ${childIndex}`}
                          component={'input'}
                        />
                      );
                    });

                    return (
                      <Card>
                        {childEle}
                        <Button onClick={() => childOperation.add()}>添加子元素</Button>
                      </Card>
                    );
                  }}
                </FormList>
              </Card>
            );
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
            list: [{ name: '1', childList: [{ name: '11' }, { name: '12' }] }, { name: '2' }, { name: '3' }],
          };
          // 不行，只给了values设置set方法，没有给list设置set方法
          // form.values.list = [{ name: '1' }, { name: '2' }, { name: '3' }];
        }}
      >
        表单实例
      </Button>
    </Form>
  );
};

export default List;
