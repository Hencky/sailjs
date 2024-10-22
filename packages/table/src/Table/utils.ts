import type { ModalFormInstance } from '@voyagejs/form';
import type { ColumnType as AColumnType } from 'antd/lib/table';
import type { TableStore } from './store';
import type { ColumnType } from './interface';

export function renderColumns<RecordType = unknown>(
  columns: ColumnType<RecordType>[],
  ctx: { table: TableStore; modal: ModalFormInstance },
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
