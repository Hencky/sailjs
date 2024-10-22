import { Space, Button } from 'antd';
import React, { useRef } from 'react';
import { Table, TableStore } from '@voyagejs/table';
import { columns, remoteDataSource, type RecordType } from './config';
import { toJS } from 'mobx';

export const TableDemo = () => {
  const tableRef = useRef<TableStore<any>>(null);

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={() => tableRef.current!.refresh()}>刷新表格</Button>
        <Button onClick={() => tableRef.current!.refresh({ a: 1 })}>刷新表格带参数</Button>
        <Button onClick={() => tableRef.current!.reset()}>重置到初始状态</Button>
        <Button onClick={() => (tableRef.current!.dataSource = [{ id: 333 }])}>设置数据源</Button>
        <Button onClick={() => (tableRef.current!.loading = !tableRef.current!.loading)}>切换loading</Button>
        <Button onClick={() => (tableRef.current!.pagination = { current: 2, pageSize: 20, total: 200 })}>
          设置分页
        </Button>
        <Button onClick={() => console.log(toJS(tableRef.current!.selectedRows))}>获取选中行</Button>
        <Button onClick={() => console.log(toJS(tableRef.current!.selectedRowKeys))}>获取选中行keys</Button>
        <Button
          onClick={() => {
            tableRef.current!.selectedRows = [{ id: '1' }];
          }}
        >
          设置选中行(通过rows)
        </Button>
        <Button
          onClick={() => {
            tableRef.current!.selectedRowKeys = ['1', '2'];
          }}
        >
          设置选中行(通过rowKeys)
        </Button>
        <Button onClick={() => (tableRef.current!.selectedRows = [])}>清空选中行</Button>
      </Space>
      <Table columns={columns} remoteDataSource={remoteDataSource} ref={tableRef} rowSelection={true} />
    </div>
  );
};
