import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../components/my-button';
import '../components/my-button-group';

type Args = {
  label: string;
  type: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text' | 'link';
  size: 'large' | 'default' | 'small';
  plain: boolean;
  round: boolean;
  circle: boolean;
  disabled: boolean;
  loading: boolean;
  block: boolean;
  nativeType: 'button' | 'submit' | 'reset';
  autofocus: boolean;
  autoInsertSpace: boolean;
};

const meta: Meta<Args> = {
  title: 'Components/MyButton',
  tags: ['autodocs'],
  args: {
    label: '点击我',
    type: 'primary',
    size: 'default',
    plain: false,
    round: false,
    circle: false,
    disabled: false,
    loading: false,
    block: false,
    nativeType: 'button',
    autofocus: false,
    autoInsertSpace: false
  },
  argTypes: {
    label: { control: 'text' },
    type: {
      control: { type: 'radio' },
      options: ['default', 'primary', 'success', 'warning', 'danger', 'info', 'text', 'link']
    },
    size: { control: { type: 'radio' }, options: ['large', 'default', 'small'] },
    plain: { control: 'boolean' },
    round: { control: 'boolean' },
    circle: { control: 'boolean' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    block: { control: 'boolean' },
    nativeType: { control: { type: 'radio' }, options: ['button', 'submit', 'reset'] },
    autofocus: { control: 'boolean' },
    autoInsertSpace: { control: 'boolean' }
  }
};

export default meta;

type Story = StoryObj<Args>;

export const Primary: Story = {
  render: (args) => html`
    <my-button
      label=${args.label}
      type=${args.type}
      size=${args.size}
      ?plain=${args.plain}
      ?round=${args.round}
      ?circle=${args.circle}
      ?disabled=${args.disabled}
      ?loading=${args.loading}
      ?block=${args.block}
      native-type=${args.nativeType}
      ?autofocus=${args.autofocus}
      ?auto-insert-space=${args.autoInsertSpace}
    ></my-button>
  `
};

export const Types: Story = {
  args: { type: 'default' },
  render: (args) => html`
    <div style="display:flex; gap:8px; flex-wrap:wrap;">
      <my-button label="Default" type="default"></my-button>
      <my-button label="Primary" type="primary"></my-button>
      <my-button label="Success" type="success"></my-button>
      <my-button label="Warning" type="warning"></my-button>
      <my-button label="Danger" type="danger"></my-button>
      <my-button label="Info" type="info"></my-button>
      <my-button label="Text" type="text"></my-button>
      <my-button label="Link" type="link"></my-button>
    </div>
  `
};

export const Sizes: Story = {
  render: () => html`
    <div style="display:flex; gap:8px; align-items:center;">
      <my-button label="Large" size="large" type="primary"></my-button>
      <my-button label="Default" size="default" type="primary"></my-button>
      <my-button label="Small" size="small" type="primary"></my-button>
    </div>
  `
};

export const PlainAndRound: Story = {
  render: () => html`
    <div style="display:flex; gap:8px; flex-wrap:wrap;">
      <my-button label="Plain" plain type="primary"></my-button>
      <my-button label="Round" round type="primary"></my-button>
      <my-button label="Plain Round" plain round type="success"></my-button>
    </div>
  `
};

export const Circle: Story = {
  render: () => html`
    <div style="display:flex; gap:8px; align-items:center;">
      <my-button circle type="primary">+</my-button>
      <my-button circle type="success">✓</my-button>
      <my-button circle type="danger">×</my-button>
    </div>
  `
};

export const LoadingAndDisabled: Story = {
  render: () => html`
    <div style="display:flex; gap:8px; flex-wrap:wrap;">
      <my-button label="Loading" type="primary" loading></my-button>
      <my-button label="Disabled" type="primary" disabled></my-button>
      <my-button label="Loading Disabled" type="primary" loading disabled></my-button>
    </div>
  `
};

export const Block: Story = {
  render: () => html`
    <div style="display:flex; flex-direction:column; gap:8px; width:260px;">
      <my-button label="Block Primary" type="primary" block></my-button>
      <my-button label="Block Plain" type="success" plain block></my-button>
      <my-button label="Block Link" type="link" block></my-button>
    </div>
  `
};

export const IconAndSpace: Story = {
  render: () => html`
    <div style="display:flex; gap:8px; flex-wrap:wrap; align-items:center;">
      <my-button label="下载" type="primary" auto-insert-space>
        <span slot="icon">⬇️</span>
      </my-button>
      <my-button label="上传" type="success" auto-insert-space>
        <span slot="icon">⬆️</span>
      </my-button>
    </div>
  `
};

export const WithAction: Story = {
  args: { label: '点我试试', type: 'primary' },
  render: (args) => html`
    <my-button
      label=${args.label}
      type=${args.type}
      size=${args.size}
      ?plain=${args.plain}
      ?round=${args.round}
      ?circle=${args.circle}
      ?disabled=${args.disabled}
      ?loading=${args.loading}
      ?block=${args.block}
      native-type=${args.nativeType}
      ?autofocus=${args.autofocus}
      ?auto-insert-space=${args.autoInsertSpace}
    ></my-button>
  `
};

export const ButtonGroup: Story = {
  render: () => html`
    <my-button-group>
      <my-button label="左" type="primary"></my-button>
      <my-button label="中" type="primary"></my-button>
      <my-button label="右" type="primary"></my-button>
    </my-button-group>
  `
};
