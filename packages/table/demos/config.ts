import { random, draw } from 'radash';
import type { TableProps, ColumnType } from '@voyagejs/table';

const status = ['dispatching', 'success', 'warning'];

const level = ['High', 'Medium', 'Low'];

const recipientName = ['Lucy', 'Lily', 'Jack', 'Mocy'];

const recipientTime = ['morning', 'afternoon', 'night'];

const priceProject = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

export type RecordType = {
  a: number;
  b: number;
  c: number;
  id: string;
};

export const columns: ColumnType<RecordType>[] = [
  {
    key: 'id',
    title: 'ID',
    sorter: true,
  },
  {
    key: 'senderName',
    title: '发送人',
    tooltip: '提示',
  },
  {
    key: 'recipientName',
    title: '接收人',
    filters: recipientName.map((i) => ({ text: i, value: i })),
  },
  {
    key: 'status',
    title: '状态',
  },
];

export const remoteDataSource: TableProps['remoteDataSource'] = (params) => {
  console.log('params', params);
  const { current, pageSize } = params;
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = {
        ...params,
        total: 100,
        data: new Array(10).fill(0).map((item, index) => {
          return {
            id: `${(current - 1) * pageSize + index}`,
            name: random(0, 100),
            senderName: random(0, 100),
            senderNumber: random(0, 100),
            senderAddress: random(0, 100),
            recipientName: draw(recipientName),
            recipientNumber: random(0, 100),
            recipientAddress: random(0, 100),
            recipientTime: draw(recipientTime),
            time: [random(0, 100), random(0, 100)],
            priceProject: draw(priceProject),
            address: random(0, 100),
            status: draw(status),
            level: draw(level),
            description: random(0, 100),
            times: random(0, 100),
            createTime: random(0, 100),
            ruler: [[{ type: 'price', comparator: 'lt', value: '100' }]],
          };
        }),
      };

      console.log('result', data);
      resolve(data);
    }, 500);
  });
};

export const remoteDataSourceSingle: TableProps['remoteDataSource'] = (params) => {
  console.log('params', params);
  const { current, pageSize } = params;
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = new Array(10).fill(0).map((item, index) => {
        return {
          id: `${(current - 1) * pageSize + index}`,
          name: random(0, 100),
          senderName: random(0, 100),
          senderNumber: random(0, 100),
          senderAddress: random(0, 100),
          recipientName: draw(recipientName),
          recipientNumber: random(0, 100),
          recipientAddress: random(0, 100),
          recipientTime: draw(recipientTime),
          time: [random(0, 100), random(0, 100)],
          priceProject: draw(priceProject),
          address: random(0, 100),
          status: draw(status),
          level: draw(level),
          description: random(0, 100),
          times: random(0, 100),
          createTime: random(0, 100),
          ruler: [[{ type: 'price', comparator: 'lt', value: '100' }]],
        };
      });

      console.log('result', data);
      resolve(data);
    }, 500);
  });
};
