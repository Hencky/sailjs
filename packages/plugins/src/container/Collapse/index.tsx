import { Collapse as ACollapse } from 'antd';
import { FormGroup } from '@sailjs/core';
import type { FormGroupProps } from '@sailjs/core';
import type { CollapseProps as ACollapseProps } from 'antd/lib/collapse';
import type { ItemType } from 'rc-collapse/es/interface';

export interface CollapseProps extends Omit<ACollapseProps, 'items'> {
  items: (ItemType & { items: FormGroupProps[] })[];
}

export const Collapse: React.FC<CollapseProps> = (props) => {
  const { items, ...rest } = props;

  const finalItems = items.map((item) => {
    return {
      key: item.key,
      label: item.label,
      children: <FormGroup items={item.items} />,
    };
  });

  return <ACollapse {...rest} items={finalItems} />;
};

// const demos = [
//   {
//     container: 'collapse',
//     containerProps: {
//       items: [
//         {
//           key: '1',
//           label: 'Item 1',
//           // FormGroup items配置
//           items: [{}],
//         },
//       ],
//     },
//   },
// ];
