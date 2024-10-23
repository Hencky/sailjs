import React, { useMemo, useImperativeHandle, forwardRef, Fragment } from 'react';
import { toJS } from 'mobx';
import { Table as ATable } from 'antd';
import { observer } from 'mobx-react-lite';
import { useModalForm } from '@voyagejs/form';
import { TableStore } from './store';
import { renderColumns } from './utils';
import type { ModalFormInstance } from '@voyagejs/form';
import type { TableProps } from './interface';

export type TableRef = {
  table: TableStore;
  modal: ModalFormInstance;
};

export const Table = observer(
  forwardRef((props: TableProps, ref: React.Ref<TableRef>) => {
    const table = useMemo(() => new TableStore(props), [props]);

    const [modalForm, modalCtx] = useModalForm();

    const { columns } = props;

    useImperativeHandle(
      ref,
      () => ({
        table,
        modal: modalCtx,
      }),
      [table, modalCtx]
    );

    return (
      <Fragment>
        {modalForm}
        <ATable
          rowKey={'id'}
          bordered={false}
          onChange={table.onTableChange}
          {...toJS(table.tableProps)}
          columns={renderColumns(columns!, { table, modal: modalCtx })}
        />
      </Fragment>
    );
  })
);
