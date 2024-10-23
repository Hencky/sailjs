import { isObject } from 'radash';
import { makeObservable, observable, computed, toJS, runInAction } from 'mobx';
import type { TableProps as ATableProps, TablePaginationConfig } from 'antd';
import type { TableProps, SorterParams } from './interface';
import type { TableRowSelection } from 'antd/lib/table/interface';

export class TableStore<RecordType extends Object = any> implements TableProps<RecordType> {
  loading = false;

  rowKey = 'id';

  dataSource: RecordType[] = [];

  pagination: ATableProps<RecordType>['pagination'];

  initialPagination: ATableProps<RecordType>['pagination'];

  rowSelection?: TableProps<RecordType>['rowSelection'];

  selectedRows: RecordType[] = [];

  sorter?: SorterParams<RecordType>;

  filter = {};

  onChange?: TableProps<RecordType>['onChange'];

  remoteDataSource?: TableProps<RecordType>['remoteDataSource'];

  constructor(props: TableProps<RecordType>) {
    Object.keys(props).forEach((key) => {
      // @ts-ignore
      this[key] = props[key];
    });

    this.makeObservable();
    this.setInitialPagination(props);

    this.refresh();
  }

  makeObservable() {
    makeObservable(this, {
      loading: observable.ref,
      dataSource: observable,
      pagination: observable,
      sorter: observable,
      filter: observable,
      selectedRows: observable,
      selectedRowKeys: computed,
      rowSelection: observable,
      noPagination: computed,
    });
  }

  get noPagination() {
    return this.pagination === false;
  }

  private setInitialPagination(props: TableProps<RecordType>) {
    const { pagination = {} } = props;
    if (pagination === false) return;
    const { defaultCurrent, defaultPageSize } = pagination as TablePaginationConfig;
    this.pagination = this.initialPagination = {
      current: defaultCurrent ?? 1,
      pageSize: defaultPageSize ?? 10,
      showQuickJumper: true,
      showSizeChanger: true,
      showTotal(total) {
        return `共 ${total} 条`;
      },
    };
  }

  refresh(params?: Record<string, any>): Promise<void> | undefined {
    if (!this.remoteDataSource) return;

    const requestParams = { ...toJS(this.filter), sorter: toJS(this.sorter), ...params };

    this.loading = true;

    const { current, pageSize } = this.pagination as TablePaginationConfig;

    return this.remoteDataSource(this.noPagination ? requestParams : { current, pageSize, ...requestParams })
      .then((res) => {
        runInAction(() => {
          this.dataSource = res.data;
          if (!this.noPagination) {
            this.pagination = { ...this.pagination, total: res.total };
          }
          this.loading = false;
        });
      })
      .catch(() => {
        this.loading = false;
      });
  }

  reset() {
    this.setInitialPagination({ pagination: this.initialPagination });
    this.filter = {};
    this.sorter = undefined;
    this.refresh();
  }

  onTableChange: TableProps<RecordType>['onChange'] = (pagination, filters, sorter, ...args) => {
    this.pagination = pagination;
    this.filter = filters;
    this.sorter = sorter;
    this.onChange?.(pagination, filters, sorter, ...args);
    this.refresh();
  };

  onRowSelectionChange: TableRowSelection<RecordType>['onChange'] = (
    currentSelectedRowKeys,
    currentSelectedRows,
    info
  ) => {
    this.selectedRows = currentSelectedRows;
    if (!isObject(this.rowSelection)) return;
    const { onChange } = this.rowSelection as TableRowSelection<RecordType>;
    onChange?.(currentSelectedRowKeys, currentSelectedRows, info);
  };

  set selectedRowKeys(keys) {
    this.selectedRows = keys.map((key) => ({ [this.rowKey]: key } as unknown as RecordType));
  }

  get selectedRowKeys() {
    return this.selectedRows.map((rowData) => rowData[this.rowKey as keyof RecordType]);
  }

  get tableProps(): ATableProps<RecordType> {
    return {
      dataSource: this.dataSource,
      pagination: this.pagination,
      loading: this.loading,
      rowSelection: this.rowSelection
        ? ({
            ...(this.rowSelection === true ? {} : this.rowSelection),
            selectedRowKeys: this.selectedRowKeys,
            onChange: this.onRowSelectionChange,
          } as TableRowSelection<RecordType>)
        : undefined,
    };
  }
}
