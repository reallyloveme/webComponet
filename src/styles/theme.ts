import { css } from 'lit';

export const globalTheme = css`
  :host,
  :host-context([data-theme="light"]),
  :root,
  [data-theme="light"] {
    --my-theme-mode: light;

    --my-color-white: #ffffff;
    --my-color-black: #000000;
    --my-color-primary: #409eff;
    --my-color-success: #67c23a;
    --my-color-warning: #e6a23c;
    --my-color-danger: #f56c6c;
    --my-color-info: #909399;
    --my-text-color-primary: #303133;
    --my-text-color-regular: #606266;
    --my-text-color-placeholder: #a8abb2;
    --my-border-color: #dcdfe6;
    --my-border-radius-base: 6px;
    --my-shadow-focus: rgba(64, 158, 255, 0.3);

    --my-button-default-bg: var(--my-color-white);
    --my-button-default-text: var(--my-text-color-primary);
    --my-button-default-border: var(--my-border-color);
    --my-button-primary-bg: var(--my-color-primary);
    --my-button-primary-text: var(--my-color-white);
    --my-button-primary-border: var(--my-color-primary);
    --my-button-success-bg: var(--my-color-success);
    --my-button-success-text: var(--my-color-white);
    --my-button-success-border: var(--my-color-success);
    --my-button-warning-bg: var(--my-color-warning);
    --my-button-warning-text: var(--my-color-white);
    --my-button-warning-border: var(--my-color-warning);
    --my-button-danger-bg: var(--my-color-danger);
    --my-button-danger-text: var(--my-color-white);
    --my-button-danger-border: var(--my-color-danger);
    --my-button-info-bg: var(--my-color-info);
    --my-button-info-text: var(--my-color-white);
    --my-button-info-border: var(--my-color-info);
    --my-button-text-color: var(--my-color-primary);
    --my-button-link-color: var(--my-color-primary);
    --my-button-text-hover: #66b1ff;
    --my-button-link-hover: #66b1ff;
    --my-button-text-active: #3a8ee6;
    --my-button-link-active: #3a8ee6;
    --my-button-default-hover-bg: #f5f7fa;
    --my-button-default-active-bg: #e6e8eb;
    --my-button-primary-hover-bg: #66b1ff;
    --my-button-primary-active-bg: #3a8ee6;
    --my-button-success-hover-bg: #85ce61;
    --my-button-success-active-bg: #5daf34;
    --my-button-warning-hover-bg: #ebb563;
    --my-button-warning-active-bg: #cf9236;
    --my-button-danger-hover-bg: #f78989;
    --my-button-danger-active-bg: #dd6161;
    --my-button-info-hover-bg: #a6a9ad;
    --my-button-info-active-bg: #82848a;

    --my-button-plain-default-bg: var(--my-color-white);
    --my-button-plain-default-text: var(--my-text-color-regular);
    --my-button-plain-default-border: var(--my-border-color);
    --my-button-plain-default-hover-text: var(--my-color-primary);
    --my-button-plain-primary-bg: #ecf5ff;
    --my-button-plain-primary-text: var(--my-color-primary);
    --my-button-plain-primary-border: #b3d8ff;
    --my-button-plain-primary-hover-text: var(--my-color-primary);
    --my-button-plain-success-bg: #f0f9eb;
    --my-button-plain-success-text: var(--my-color-success);
    --my-button-plain-success-border: #c2e7b0;
    --my-button-plain-success-hover-text: var(--my-color-success);
    --my-button-plain-warning-bg: #fdf6ec;
    --my-button-plain-warning-text: var(--my-color-warning);
    --my-button-plain-warning-border: #f5dab1;
    --my-button-plain-warning-hover-text: var(--my-color-warning);
    --my-button-plain-danger-bg: #fef0f0;
    --my-button-plain-danger-text: var(--my-color-danger);
    --my-button-plain-danger-border: #fbc4c4;
    --my-button-plain-danger-hover-text: var(--my-color-danger);
    --my-button-plain-info-bg: #f4f4f5;
    --my-button-plain-info-text: var(--my-color-info);
    --my-button-plain-info-border: #d3d4d6;
    --my-button-plain-info-hover-text: var(--my-color-info);
    --my-button-plain-primary-hover-bg: #d9ecff;
    --my-button-plain-primary-hover-border: #a0cfff;
    --my-button-plain-success-hover-bg: #e1f3d8;
    --my-button-plain-success-hover-border: #b3e19d;
    --my-button-plain-warning-hover-bg: #faecd8;
    --my-button-plain-warning-hover-border: #f3d19e;
    --my-button-plain-danger-hover-bg: #fde2e2;
    --my-button-plain-danger-hover-border: #fab6b6;
    --my-button-plain-info-hover-bg: #e9e9eb;
    --my-button-plain-info-hover-border: #c8c9cc;

    --my-button-disabled-text: var(--my-text-color-placeholder);
    --my-button-radius: var(--my-border-radius-base);
    --my-button-focus-shadow: var(--my-shadow-focus);

    --my-table-bg: var(--my-color-white);
    --my-table-header-bg: #f5f7fa;
    --my-table-header-text: var(--my-text-color-regular);
    --my-table-text: var(--my-text-color-primary);
    --my-table-border: #ebeef5;
    --my-table-row-hover-bg: #f5f7fa;
    --my-table-striped-bg: #fafafa;
    --my-table-empty-text: var(--my-text-color-placeholder);
  }

  :host-context([data-theme="dark"]),
  :root[data-theme="dark"],
  [data-theme="dark"] {
    --my-theme-mode: dark;
    --my-color-white: #1e1e1e;
    --my-color-black: #000000;
    --my-color-primary: #409eff;
    --my-color-success: #67c23a;
    --my-color-warning: #e6a23c;
    --my-color-danger: #f56c6c;
    --my-color-info: #909399;
    --my-text-color-primary: #e5eaf3;
    --my-text-color-regular: #c0c4cc;
    --my-text-color-placeholder: #909399;
    --my-border-color: #4c4d4f;
    --my-border-radius-base: 6px;
    --my-shadow-focus: rgba(64, 158, 255, 0.35);

    --my-button-default-bg: #2b2b2b;
    --my-button-default-text: var(--my-text-color-primary);
    --my-button-default-border: var(--my-border-color);
    --my-button-primary-bg: var(--my-color-primary);
    --my-button-primary-text: #ffffff;
    --my-button-primary-border: var(--my-color-primary);
    --my-button-success-bg: var(--my-color-success);
    --my-button-success-text: #ffffff;
    --my-button-success-border: var(--my-color-success);
    --my-button-warning-bg: var(--my-color-warning);
    --my-button-warning-text: #ffffff;
    --my-button-warning-border: var(--my-color-warning);
    --my-button-danger-bg: var(--my-color-danger);
    --my-button-danger-text: #ffffff;
    --my-button-danger-border: var(--my-color-danger);
    --my-button-info-bg: var(--my-color-info);
    --my-button-info-text: #ffffff;
    --my-button-info-border: var(--my-color-info);
    --my-button-text-color: var(--my-color-primary);
    --my-button-link-color: var(--my-color-primary);
    --my-button-text-hover: #66b1ff;
    --my-button-link-hover: #66b1ff;
    --my-button-text-active: #3a8ee6;
    --my-button-link-active: #3a8ee6;
    --my-button-default-hover-bg: #353535;
    --my-button-default-active-bg: #2a2a2a;
    --my-button-primary-hover-bg: #337ecc;
    --my-button-primary-active-bg: #2b6cb0;
    --my-button-success-hover-bg: #4e9a2f;
    --my-button-success-active-bg: #3e7d25;
    --my-button-warning-hover-bg: #c58a2a;
    --my-button-warning-active-bg: #a57422;
    --my-button-danger-hover-bg: #d45b5b;
    --my-button-danger-active-bg: #b94b4b;
    --my-button-info-hover-bg: #7c7f85;
    --my-button-info-active-bg: #63666b;

    --my-button-plain-default-bg: #2b2b2b;
    --my-button-plain-default-text: var(--my-text-color-regular);
    --my-button-plain-default-border: var(--my-border-color);
    --my-button-plain-default-hover-text: var(--my-color-primary);
    --my-button-plain-primary-bg: #1f2d3d;
    --my-button-plain-primary-text: var(--my-color-primary);
    --my-button-plain-primary-border: #274a78;
    --my-button-plain-primary-hover-text: var(--my-color-primary);
    --my-button-plain-success-bg: #1f2d1f;
    --my-button-plain-success-text: var(--my-color-success);
    --my-button-plain-success-border: #315a2a;
    --my-button-plain-success-hover-text: var(--my-color-success);
    --my-button-plain-warning-bg: #2d2619;
    --my-button-plain-warning-text: var(--my-color-warning);
    --my-button-plain-warning-border: #5a4b2a;
    --my-button-plain-warning-hover-text: var(--my-color-warning);
    --my-button-plain-danger-bg: #2d1f1f;
    --my-button-plain-danger-text: var(--my-color-danger);
    --my-button-plain-danger-border: #5a2a2a;
    --my-button-plain-danger-hover-text: var(--my-color-danger);
    --my-button-plain-info-bg: #2b2b2b;
    --my-button-plain-info-text: var(--my-color-info);
    --my-button-plain-info-border: #4c4d4f;
    --my-button-plain-info-hover-text: var(--my-color-info);
    --my-button-plain-primary-hover-bg: #22344d;
    --my-button-plain-primary-hover-border: #2d5a99;
    --my-button-plain-success-hover-bg: #253a24;
    --my-button-plain-success-hover-border: #3d6b33;
    --my-button-plain-warning-hover-bg: #3a2f1f;
    --my-button-plain-warning-hover-border: #6d5a33;
    --my-button-plain-danger-hover-bg: #3a2626;
    --my-button-plain-danger-hover-border: #6d3333;
    --my-button-plain-info-hover-bg: #3a3a3a;
    --my-button-plain-info-hover-border: #5a5b5d;

    --my-button-disabled-text: #7d7e80;
    --my-button-radius: var(--my-border-radius-base);
    --my-button-focus-shadow: rgba(64, 158, 255, 0.35);

    --my-table-bg: #1f1f1f;
    --my-table-header-bg: #2a2a2a;
    --my-table-header-text: var(--my-text-color-regular);
    --my-table-text: var(--my-text-color-primary);
    --my-table-border: #3a3a3a;
    --my-table-row-hover-bg: #2f2f2f;
    --my-table-striped-bg: #262626;
    --my-table-empty-text: var(--my-text-color-placeholder);
  }
`;
