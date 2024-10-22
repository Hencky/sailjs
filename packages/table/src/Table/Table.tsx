import React, { useMemo, useImperativeHandle, forwardRef } from 'react';
import { toJS } from 'mobx';
import { Table as ATable } from 'antd';
import { observer } from 'mobx-react-lite';
import { TableStore } from './store';
import { renderColumns } from './utils';
import type { TableProps } from './interface';

export const Table = observer(
  forwardRef((props: TableProps, ref: React.Ref<TableStore>) => {
    const table = useMemo(() => new TableStore(props), [props]);

    const { columns } = props;

    useImperativeHandle(ref, () => table);

    return (
      <ATable
        rowKey={'id'}
        bordered={false}
        onChange={table.onTableChagne}
        {...toJS(table.tableProps)}
        columns={renderColumns(columns!, table)}
      />
    );
  })
);
