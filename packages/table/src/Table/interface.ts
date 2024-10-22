import type { ReactElement } from 'react';
import type { ModalFormInstance } from '@voyagejs/form';
import type { ColumnType as AColumnType, TableProps as ATableProps } from 'antd/lib/table';
import type { Key, SorterResult, TableRowSelection } from 'antd/lib/table/interface';

/**
 * 额外的初始请求参数，注意：参数变化时，表格不会刷新
 * @default {}
 */
export type ExtraRequestParams = Record<string, unknown>;

/**
 * 排序配置
 */
export type SorterParams<RecordType extends Object = any> = SorterResult<RecordType> | SorterResult<RecordType>[];

/**
 * 过滤配置
 */
export type FilterParams = Record<string, unknown>;

/**
 * 分页配置
 */
export type Pagination = {
  /** 当前页 */
  current?: number;
  /** 分页大小 */
  pageSize?: number;
  /** 总条数 */
  total: number;
};

export type BaseRequestParams = Pick<Pagination, 'current' | 'pageSize'>;

export type RequestParams<RecordType extends Object = any> = BaseRequestParams &
  ExtraRequestParams &
  FilterParams & {
    sorter?: SorterParams<RecordType>;
  };

export type RequestResult<RecordType extends Object = any> = {
  /** 数据源 **/
  data: RecordType[];
  /** 当前页 **/
  current: number;
  /** 数据总条数 **/
  total: number;
  /** 分页大小 **/
  pageSize: number;
};

export interface TableInstance<RecordType extends Object = any> {
  /** 刷新表格 */
  refresh: (extraRefreshParams?: Record<string, unknown>) => Promise<void> | undefined;
  /** 重置表格到初始状态 */
  reset: (initialValues?: Record<string, unknown>) => void;
  /** 获取表格选中行数据 */
  getSelectedRowKeys: () => Key[];
  /** 设置表格选中行数据 */
  // setSelectedRowKeys: (rows: Key[]) => void;
  /** 获取表格选中行数据 */
  getSelectedRows: () => RecordType[];
  /** 设置表格选中行数据 */
  setSelectedRows: (rows: RecordType[]) => void;
  /** 获取数据源 */
  getDataSource: () => RecordType[];
  /** 设置数据源 */
  setDataSource: (dataSource: RecordType[]) => void;
  /** 获取分页配置 */
  getPagination: () => Pagination;
  /** 设置分页配置 */
  setPagination: (pagination: Pagination) => void;
  /** 获取表格loading状态 */
  getLoading: () => boolean;
  /** 设置表格loading状态 */
  setLoading: (loading: boolean) => void;
  /** 强制刷新表格 */
  forceUpdate: () => void;
}

export interface ColumnType<RecordType> extends Omit<AColumnType<RecordType>, 'render' | 'key'> {
  render?: (ctx: {
    value: RecordType;
    index: number;
    table: TableInstance;
    record: RecordType;
    modal: ModalFormInstance;
  }) => ReactElement;
  key?: string;
  /** 列显示状态，为false时隐藏列 */
  visible?: boolean;
  children?: ColumnType<RecordType>[];
  tooltip?: string;
}

export interface TableProps<RecordType extends Object = any>
  extends Omit<ATableProps<RecordType>, 'dataSource' | 'loading' | 'rowSelection' | 'columns'> {
  /** 远程数据源 */
  remoteDataSource?: (params: RequestParams) => Promise<RequestResult<RecordType>>;
  /** 默认分页配置 */
  defaultPagination?: Pagination;
  /** 选中行配置 */
  rowSelection?: true | TableRowSelection<RecordType>;
  /** 初始是否发起一次请求，默认发起请求 */
  requestOnMount?: boolean;
  /** 列配置 */
  columns?: ColumnType<RecordType>[];
}
