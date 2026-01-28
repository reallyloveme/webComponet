import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { buttonTheme } from '../styles/button-theme';

export class MyButton extends LitElement {
  static styles = [
    buttonTheme,
    css`
    :host { display: inline-block; }
    button {
      font: inherit;
      border-radius: var(--my-button-radius);
      padding: 8px 15px;
      cursor: pointer;
      border: 1px solid transparent;
      transition: background 120ms ease, border-color 120ms ease, color 120ms ease, box-shadow 120ms ease;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      line-height: 1;
      user-select: none;
    }
    ::slotted([slot="icon"]) {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 1em;
      line-height: 1;
    }

    button.type-default {
      background: var(--my-button-default-bg);
      color: var(--my-button-default-text);
      border-color: var(--my-button-default-border);
    }
    button.type-primary {
      background: var(--my-button-primary-bg);
      color: var(--my-button-primary-text);
      border-color: var(--my-button-primary-border);
    }
    button.type-success {
      background: var(--my-button-success-bg);
      color: var(--my-button-success-text);
      border-color: var(--my-button-success-border);
    }
    button.type-warning {
      background: var(--my-button-warning-bg);
      color: var(--my-button-warning-text);
      border-color: var(--my-button-warning-border);
    }
    button.type-danger {
      background: var(--my-button-danger-bg);
      color: var(--my-button-danger-text);
      border-color: var(--my-button-danger-border);
    }
    button.type-info {
      background: var(--my-button-info-bg);
      color: var(--my-button-info-text);
      border-color: var(--my-button-info-border);
    }
    button.type-text {
      background: transparent;
      color: var(--my-button-text-color);
      border-color: transparent;
    }
    button.type-link {
      background: transparent;
      color: var(--my-button-link-color);
      border-color: transparent;
      padding-left: 0;
      padding-right: 0;
    }

    button.plain.type-default {
      background: var(--my-button-plain-default-bg);
      color: var(--my-button-plain-default-text);
      border-color: var(--my-button-plain-default-border);
    }
    button.plain.type-primary {
      background: var(--my-button-plain-primary-bg);
      color: var(--my-button-plain-primary-text);
      border-color: var(--my-button-plain-primary-border);
    }
    button.plain.type-success {
      background: var(--my-button-plain-success-bg);
      color: var(--my-button-plain-success-text);
      border-color: var(--my-button-plain-success-border);
    }
    button.plain.type-warning {
      background: var(--my-button-plain-warning-bg);
      color: var(--my-button-plain-warning-text);
      border-color: var(--my-button-plain-warning-border);
    }
    button.plain.type-danger {
      background: var(--my-button-plain-danger-bg);
      color: var(--my-button-plain-danger-text);
      border-color: var(--my-button-plain-danger-border);
    }
    button.plain.type-info {
      background: var(--my-button-plain-info-bg);
      color: var(--my-button-plain-info-text);
      border-color: var(--my-button-plain-info-border);
    }

    button.size-large {
      padding: 10px 19px;
      font-size: 14px;
    }
    button.size-default {
      padding: 8px 15px;
      font-size: 14px;
    }
    button.size-small {
      padding: 6px 11px;
      font-size: 12px;
    }

    button.round {
      border-radius: 20px;
    }
    button.circle {
      border-radius: 50%;
      padding: 8px;
      width: 32px;
      height: 32px;
      justify-content: center;
    }
    button.circle.size-large {
      width: 40px;
      height: 40px;
      padding: 10px;
    }
    button.circle.size-small {
      width: 24px;
      height: 24px;
      padding: 6px;
    }
    button.block {
      width: 100%;
      justify-content: center;
    }

    button.type-default:not(:disabled):not(.loading):hover {
      background: var(--my-button-default-hover-bg);
    }
    button.type-default:not(:disabled):not(.loading):active {
      background: var(--my-button-default-active-bg);
    }
    button.type-primary:not(:disabled):not(.loading):hover {
      background: var(--my-button-primary-hover-bg);
      border-color: var(--my-button-primary-hover-bg);
    }
    button.type-primary:not(:disabled):not(.loading):active {
      background: var(--my-button-primary-active-bg);
      border-color: var(--my-button-primary-active-bg);
    }
    button.type-success:not(:disabled):not(.loading):hover {
      background: var(--my-button-success-hover-bg);
      border-color: var(--my-button-success-hover-bg);
    }
    button.type-success:not(:disabled):not(.loading):active {
      background: var(--my-button-success-active-bg);
      border-color: var(--my-button-success-active-bg);
    }
    button.type-warning:not(:disabled):not(.loading):hover {
      background: var(--my-button-warning-hover-bg);
      border-color: var(--my-button-warning-hover-bg);
    }
    button.type-warning:not(:disabled):not(.loading):active {
      background: var(--my-button-warning-active-bg);
      border-color: var(--my-button-warning-active-bg);
    }
    button.type-danger:not(:disabled):not(.loading):hover {
      background: var(--my-button-danger-hover-bg);
      border-color: var(--my-button-danger-hover-bg);
    }
    button.type-danger:not(:disabled):not(.loading):active {
      background: var(--my-button-danger-active-bg);
      border-color: var(--my-button-danger-active-bg);
    }
    button.type-info:not(:disabled):not(.loading):hover {
      background: var(--my-button-info-hover-bg);
      border-color: var(--my-button-info-hover-bg);
    }
    button.type-info:not(:disabled):not(.loading):active {
      background: var(--my-button-info-active-bg);
      border-color: var(--my-button-info-active-bg);
    }
    button.plain.type-default:not(:disabled):not(.loading):hover {
      color: var(--my-button-plain-default-hover-text);
    }
    button.plain.type-primary:not(:disabled):not(.loading):hover {
      background: var(--my-button-plain-primary-hover-bg);
      border-color: var(--my-button-plain-primary-hover-border);
      color: var(--my-button-plain-primary-hover-text);
    }
    button.plain.type-success:not(:disabled):not(.loading):hover {
      background: var(--my-button-plain-success-hover-bg);
      border-color: var(--my-button-plain-success-hover-border);
      color: var(--my-button-plain-success-hover-text);
    }
    button.plain.type-warning:not(:disabled):not(.loading):hover {
      background: var(--my-button-plain-warning-hover-bg);
      border-color: var(--my-button-plain-warning-hover-border);
      color: var(--my-button-plain-warning-hover-text);
    }
    button.plain.type-danger:not(:disabled):not(.loading):hover {
      background: var(--my-button-plain-danger-hover-bg);
      border-color: var(--my-button-plain-danger-hover-border);
      color: var(--my-button-plain-danger-hover-text);
    }
    button.plain.type-info:not(:disabled):not(.loading):hover {
      background: var(--my-button-plain-info-hover-bg);
      border-color: var(--my-button-plain-info-hover-border);
      color: var(--my-button-plain-info-hover-text);
    }
    button.type-text:not(:disabled):not(.loading):hover,
    button.type-link:not(:disabled):not(.loading):hover {
      color: var(--my-button-text-hover);
      background: transparent;
    }
    button.type-link:not(:disabled):not(.loading):hover {
      text-decoration: underline;
    }
    button.type-text:active,
    button.type-link:active {
      color: var(--my-button-text-active);
      background: transparent;
    }

    button:focus-visible {
      box-shadow: 0 0 0 2px var(--my-button-focus-shadow);
      outline: none;
    }
    button:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
    button.type-text:disabled,
    button.type-link:disabled {
      color: var(--my-button-disabled-text);
      background: transparent;
    }
    button.loading {
      cursor: not-allowed;
      opacity: 0.8;
    }
    .spinner {
      width: 14px;
      height: 14px;
      border: 2px solid currentColor;
      border-right-color: transparent;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      box-sizing: border-box;
    }
    button.size-large .spinner {
      width: 16px;
      height: 16px;
    }
    button.size-small .spinner {
      width: 12px;
      height: 12px;
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `
  ];

  @property({ type: String }) label = '按钮';
  @property({ type: String }) type: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text' | 'link' = 'default';
  @property({ type: String }) size: 'large' | 'default' | 'small' = 'default';
  @property({ type: Boolean }) plain = false;
  @property({ type: Boolean }) round = false;
  @property({ type: Boolean }) circle = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) loading = false;
  @property({ type: Boolean }) block = false;
  @property({ type: String, attribute: 'native-type' }) nativeType: 'button' | 'submit' | 'reset' = 'button';
  @property({ type: Boolean }) autofocus = false;
  @property({ type: Boolean, attribute: 'auto-insert-space' }) autoInsertSpace = false;

  private onClick = (event: Event) => {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    this.dispatchEvent(
      new CustomEvent('button-click', { bubbles: true, composed: true })
    );
  };

  private formatLabel(label: string) {
    if (!this.autoInsertSpace || !label) return label;
    const isTwoChinese = /^[\u4e00-\u9fa5]{2}$/.test(label);
    if (isTwoChinese) return `${label[0]} ${label[1]}`;
    return label;
  }

  render() {
    const classes = [
      `type-${this.type}`,
      `size-${this.size}`,
      this.plain ? 'plain' : '',
      this.round ? 'round' : '',
      this.circle ? 'circle' : '',
      this.loading ? 'loading' : '',
      this.block ? 'block' : ''
    ].filter(Boolean).join(' ');
    const textContent = this.formatLabel(this.label);
    const content = this.label ? textContent : html`<slot></slot>`;
    return html`
      <button
        class=${classes}
        type=${this.nativeType}
        ?disabled=${this.disabled || this.loading}
        aria-disabled=${this.disabled || this.loading}
        aria-busy=${this.loading}
        ?autofocus=${this.autofocus}
        @click=${this.onClick}
      >
        ${this.loading ? html`<span class="spinner"></span>` : null}
        <slot name="icon"></slot>
        ${content}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-button': MyButton;
  }
}

customElements.define('my-button', MyButton);
