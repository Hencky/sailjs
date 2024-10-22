import type { TableStore } from './store';
import type { ColumnType } from './interface';
import type { ColumnType as AColumnType } from 'antd/lib/table';

export function renderColumns<RecordType = unknown>(
  columns: ColumnType<RecordType>[],
  ctx: TableStore,
  callback?: (columnData: any) => void
): AColumnType<RecordType>[] {
  return columns
    .filter((column) => column.visible !== false)
    .map((column) => {
      const { children } = column;

      const finalRender = column.render
        ? // @ts-expect-error
          (value: any, record: RecordType, index: number) => column.render!({ value, record, index, ...ctx })
        : undefined;

      return {
        dataIndex: column.key,
        ...column,
        children: children ? renderColumns(children, ctx, callback) : undefined,
        render: finalRender,
        ...(callback ? callback(column) : {}),
      };
    });
}
