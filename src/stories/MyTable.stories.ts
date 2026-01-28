import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../components/my-table';
import '../components/my-button';

type TableColumn = {
  type?: 'selection' | 'expand';
  key: string;
  title: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  slot?: string;
  render?: (row: Record<string, unknown>) => unknown;
};

type Args = {
  columns: TableColumn[];
  data: Record<string, unknown>[];
  striped: boolean;
  bordered: boolean;
  size: 'small' | 'default' | 'large';
  emptyText: string;
  fixedHeader: boolean;
  maxHeight: string;
  sortKey: string;
  sortOrder: 'asc' | 'desc' | 'none';
  pagination: boolean;
  pageSize: number;
  currentPage: number;
  virtual: boolean;
  rowHeight: number;
  virtualHeight: number;
  virtualBuffer: number;
};

const baseColumns: TableColumn[] = [
  { key: 'name', title: '姓名', width: '120px', sortable: true },
  { key: 'age', title: '年龄', width: '80px', align: 'center', sortable: true },
  { key: 'address', title: '地址' }
];

const baseData = [
  { name: '张三', age: 28, address: '北京市海淀区' },
  { name: '李四', age: 32, address: '上海市浦东新区' },
  { name: '王五', age: 26, address: '深圳市南山区' },
  { name: '赵六', age: 41, address: '杭州市西湖区' },
  { name: '钱七', age: 22, address: '广州市天河区' },
  { name: '孙八', age: 36, address: '成都市高新区' },
  { name: '周九', age: 29, address: '武汉市武昌区' },
  { name: '吴十', age: 33, address: '南京市鼓楼区' },
  { name: '郑十一', age: 27, address: '青岛市市南区' },
  { name: '王十二', age: 31, address: '厦门市思明区' }
];

const longData = Array.from({ length: 20 }, (_, index) => ({
  name: `用户${index + 1}`,
  age: 20 + (index % 20),
  address: `城市${index + 1}`
}));
const hugeData = Array.from({ length: 1000 }, (_, index) => ({
  name: `用户${index + 1}`,
  age: 18 + (index % 40),
  address: `城市${index + 1}`
}));

const meta: Meta<Args> = {
  title: 'Components/MyTable',
  tags: ['autodocs'],
  parameters: {
    actions: { handles: ['sort-change', 'page-change', 'selection-change', 'expand-change'] }
  },
  args: {
    columns: baseColumns,
    data: baseData,
    striped: true,
    bordered: true,
    size: 'default',
    emptyText: '暂无数据',
    fixedHeader: false,
    maxHeight: '240px',
    sortKey: '',
    sortOrder: 'none',
    pagination: false,
    pageSize: 5,
    currentPage: 1,
    virtual: false,
    rowHeight: 40,
    virtualHeight: 360,
    virtualBuffer: 3
  },
  argTypes: {
    striped: { control: 'boolean' },
    bordered: { control: 'boolean' },
    size: { control: { type: 'radio' }, options: ['small', 'default', 'large'] },
    emptyText: { control: 'text' },
    fixedHeader: { control: 'boolean' },
    maxHeight: { control: 'text' },
    sortKey: { control: 'text' },
    sortOrder: { control: { type: 'radio' }, options: ['asc', 'desc', 'none'] },
    pagination: { control: 'boolean' },
    pageSize: { control: 'number' },
    currentPage: { control: 'number' },
    virtual: { control: 'boolean' },
    rowHeight: { control: 'number' },
    virtualHeight: { control: 'number' },
    virtualBuffer: { control: 'number' }
  }
};

export default meta;

type Story = StoryObj<Args>;

export const Basic: Story = {
  render: (args) => html`
    <my-table
      .columns=${args.columns}
      .data=${args.data}
      ?striped=${args.striped}
      ?bordered=${args.bordered}
      size=${args.size}
      empty-text=${args.emptyText}
      ?fixed-header=${args.fixedHeader}
      max-height=${args.maxHeight}
      sort-key=${args.sortKey}
      sort-order=${args.sortOrder}
      ?pagination=${args.pagination}
      page-size=${args.pageSize}
      current-page=${args.currentPage}
      ?virtual=${args.virtual}
      row-height=${args.rowHeight}
      virtual-height=${args.virtualHeight}
      virtual-buffer=${args.virtualBuffer}
    ></my-table>
  `
};

export const Empty: Story = {
  render: () => html`
    <my-table
      .columns=${baseColumns}
      .data=${[]}
      empty-text="暂无数据"
    ></my-table>
  `
};

export const Sortable: Story = {
  render: () => html`
    <my-table
      .columns=${baseColumns}
      .data=${baseData}
      striped
      bordered
    ></my-table>
  `
};

export const FixedHeader: Story = {
  render: () => html`
    <my-table
      .columns=${baseColumns}
      .data=${longData}
      striped
      bordered
      fixed-header
      max-height="220px"
    ></my-table>
  `
};

export const Pagination: Story = {
  render: () => html`
    <my-table
      .columns=${baseColumns}
      .data=${longData}
      striped
      bordered
      pagination
      page-size="5"
    ></my-table>
  `
};

export const WithSlots: Story = {
  render: () => html`
    <my-table
      .columns=${[
        { key: 'name', title: '姓名', slot: 'cell-name' },
        { key: 'age', title: '年龄', align: 'center', slot: 'cell-age' },
        { key: 'actions', title: '操作', slot: 'cell-actions', align: 'center' }
      ]}
      .data=${[
        { name: '张三', age: 28, actions: 'edit' },
        { name: '李四', age: 32, actions: 'delete' }
      ]}
      striped
      bordered
    >
      <template slot="cell-name"><strong>{{index}}. {{value}}</strong></template>
      <template slot="cell-age">{{value}} 岁</template>
      <template slot="cell-actions">
        <my-button type="text">查看 {{row.name}}</my-button>
        <my-button type="text">编辑</my-button>
      </template>
    </my-table>
  `
};

export const Selection: Story = {
  render: () => html`
    <my-table
      .columns=${[
        { type: 'selection', key: '__selection__', title: '', width: '48px', align: 'center' },
        { key: 'name', title: '姓名', width: '120px', sortable: true },
        { key: 'age', title: '年龄', width: '80px', align: 'center', sortable: true },
        { key: 'address', title: '地址' }
      ]}
      .data=${baseData}
      striped
      bordered
      pagination
      page-size="5"
    ></my-table>
  `
};

export const Expandable: Story = {
  render: () => html`
    <my-table
      .columns=${[
        { type: 'expand', key: '__expand__', title: '', width: '48px', align: 'center' },
        { key: 'name', title: '姓名', width: '120px', sortable: true },
        { key: 'age', title: '年龄', width: '80px', align: 'center', sortable: true },
        { key: 'address', title: '地址' }
      ]}
      .data=${baseData}
      striped
      bordered
      pagination
      page-size="5"
    >
      <template slot="expand">
        <div style="padding:8px 12px;">
          <div>姓名: {{row.name}}</div>
          <div>年龄: {{row.age}}</div>
          <div>地址: {{row.address}}</div>
        </div>
      </template>
    </my-table>
  `
};

export const Virtual: Story = {
  render: () => html`
    <my-table
      .columns=${baseColumns}
      .data=${hugeData}
      striped
      bordered
      virtual
      row-height="40"
      virtual-height="360"
      virtual-buffer="4"
    ></my-table>
  `
};
