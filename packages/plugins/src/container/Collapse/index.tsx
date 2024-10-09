import { Collapse as ACollapse } from 'antd';
import { FormGroup } from '@sailjs/core';
import type { FormGroupProps } from '@sailjs/core';
import type { CollapseProps as ACollapseProps } from 'antd/lib/collapse';
import type { ItemType } from 'rc-collapse/es/interface';

export interface CollapseProps extends Omit<ACollapseProps, 'items'> {
  items: (Pick<ItemType, 'key' | 'label'> & { panelProps?: ItemType } & FormGroupProps)[];
}

export const Collapse: React.FC<CollapseProps> = (props) => {
  const { items, ...rest } = props;

  const finalItems = items.map((item) => {
    const { key, label, panelProps, ...restItem } = item;

    return {
      ...panelProps,
      key,
      label,
      children: <FormGroup {...restItem} />,
    };
  });

  return <ACollapse {...rest} items={finalItems} />;
};
