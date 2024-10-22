import React from 'react';
import { Collapse as ACollapse } from 'antd';
import { FormGroup } from '@voyagejs/form';
import type { FormGroupProps } from '@voyagejs/form';
import type { CollapseProps as ACollapseProps } from 'antd/lib/collapse';
import type { ItemType } from 'rc-collapse/es/interface';

export interface CollapseProps extends Omit<ACollapseProps, 'items'> {
  items?: (Pick<ItemType, 'key' | 'label'> & { panelProps?: ItemType } & FormGroupProps)[];
}

export const Collapse: React.FC<CollapseProps> = (props) => {
  const { items, ...rest } = props;

  const finalItems = items?.map((item) => {
    const { key, label, panelProps, ...restItem } = item;

    return (
      <ACollapse.Panel {...panelProps} header={label} key={key!}>
        <FormGroup {...restItem} />
      </ACollapse.Panel>
    );
  });

  return <ACollapse {...rest}>{finalItems}</ACollapse>;
};
