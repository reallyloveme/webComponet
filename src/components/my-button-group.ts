import { LitElement, html, css } from 'lit';

export class MyButtonGroup extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
    }
    ::slotted(my-button) {
      --my-button-radius: 0;
    }
    ::slotted(my-button:first-child) {
      --my-button-radius: 6px;
    }
    ::slotted(my-button:last-child) {
      --my-button-radius: 6px;
    }
    ::slotted(my-button:not(:first-child)) {
      margin-left: -1px;
    }
    ::slotted(my-button:hover) {
      z-index: 1;
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-button-group': MyButtonGroup;
  }
}

customElements.define('my-button-group', MyButtonGroup);
