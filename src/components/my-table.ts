import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { globalTheme } from '../styles/theme';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

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

export class MyTable extends LitElement {
  static styles = [
    globalTheme,
    css`
    :host {
      display: block;
      color: var(--my-table-text);
      background: var(--my-table-bg);
    }
    .table-wrapper.fixed {
      overflow: auto;
    }
    .table-wrapper.virtual {
      overflow: auto;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      background: var(--my-table-bg);
      color: var(--my-table-text);
    }
    thead th {
      background: var(--my-table-header-bg);
      color: var(--my-table-header-text);
      font-weight: 500;
    }
    .table-wrapper.fixed thead th {
      position: sticky;
      top: 0;
      z-index: 1;
    }
    th.sortable {
      cursor: pointer;
      user-select: none;
    }
    th.sortable:hover {
      color: var(--my-color-primary);
    }
    .sort-indicator {
      margin-left: 6px;
      font-size: 12px;
      color: var(--my-text-color-placeholder);
    }
    th,
    td {
      padding: 12px 12px;
      border-bottom: 1px solid var(--my-table-border);
    }
    table.bordered {
      border: 1px solid var(--my-table-border);
    }
    table.bordered th,
    table.bordered td {
      border-right: 1px solid var(--my-table-border);
    }
    table.bordered th:last-child,
    table.bordered td:last-child {
      border-right: none;
    }
    tbody tr:hover td {
      background: var(--my-table-row-hover-bg);
    }
    table.striped tbody tr:nth-child(2n) td {
      background: var(--my-table-striped-bg);
    }
    table.size-small th,
    table.size-small td {
      padding: 8px 10px;
      font-size: 12px;
    }
    table.size-default th,
    table.size-default td {
      padding: 12px 12px;
      font-size: 14px;
    }
    table.size-large th,
    table.size-large td {
      padding: 14px 14px;
      font-size: 15px;
    }
    td.empty {
      text-align: center;
      color: var(--my-table-empty-text);
      padding: 24px 12px;
    }
    .pagination {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 12px 0;
      justify-content: flex-end;
    }
    .pagination button {
      border: 1px solid var(--my-table-border);
      background: var(--my-table-bg);
      color: var(--my-table-text);
      padding: 4px 8px;
      cursor: pointer;
      border-radius: 4px;
      font: inherit;
    }
    .pagination button.active {
      color: var(--my-color-primary);
      border-color: var(--my-color-primary);
    }
    .pagination button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .page-info {
      color: var(--my-text-color-regular);
      margin-left: 6px;
    }
    .expand-toggle {
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      border-radius: 4px;
    }
    .expand-toggle:hover {
      background: rgba(64, 158, 255, 0.12);
    }
    tr.expand-row td {
      background: var(--my-table-bg);
      border-bottom: 1px solid var(--my-table-border);
    }
    tr.spacer td {
      padding: 0;
      border: none;
      height: 0;
    }
  `
  ];

  @property({ type: Array }) columns: TableColumn[] = [];
  @property({ type: Array }) data: Record<string, unknown>[] = [];
  @property({ type: Boolean }) striped = false;
  @property({ type: Boolean }) bordered = true;
  @property({ type: String }) size: 'small' | 'default' | 'large' = 'default';
  @property({ type: String, attribute: 'empty-text' }) emptyText = '暂无数据';
  @property({ type: Boolean, attribute: 'fixed-header' }) fixedHeader = false;
  @property({ type: String, attribute: 'max-height' }) maxHeight = '';
  @property({ type: String }) sortKey = '';
  @property({ type: String }) sortOrder: 'asc' | 'desc' | 'none' = 'none';
  @property({ type: Boolean }) pagination = false;
  @property({ type: Number, attribute: 'page-size' }) pageSize = 10;
  @property({ type: Number, attribute: 'current-page' }) currentPage = 1;
  @property({ type: Boolean }) virtual = false;
  @property({ type: Number, attribute: 'row-height' }) rowHeight = 40;
  @property({ type: Number, attribute: 'virtual-height' }) virtualHeight = 360;
  @property({ type: Number, attribute: 'virtual-buffer' }) virtualBuffer = 3;
  private selectedRows = new Set<Record<string, unknown>>();
  private expandedRows = new Set<Record<string, unknown>>();
  private virtualScrollTop = 0;
  private wrapperEl: HTMLDivElement | null = null;

  protected updated(changedProps: Map<PropertyKey, unknown>) {
    if (changedProps.has('data') || changedProps.has('pageSize') || changedProps.has('pagination')) {
      const totalPages = this.getTotalPages(this.data.length);
      if (this.currentPage > totalPages) this.currentPage = totalPages;
      if (this.currentPage < 1) this.currentPage = 1;
    }
  }
  firstUpdated() {
    this.wrapperEl = this.renderRoot.querySelector('.table-wrapper');
    if (this.wrapperEl) {
      this.wrapperEl.addEventListener('wheel', this.onWheel, { passive: false });
    }
  }
  disconnectedCallback() {
    if (this.wrapperEl) {
      this.wrapperEl.removeEventListener('wheel', this.onWheel);
    }
    super.disconnectedCallback();
  }

  private getTableClass() {
    return [
      this.bordered ? 'bordered' : '',
      this.striped ? 'striped' : '',
      this.fixedHeader ? 'fixed' : '',
      `size-${this.size}`
    ].filter(Boolean).join(' ');
  }

  private renderHeader() {
    const viewData = this.getPagedData(this.getSortedData());
    return html`
      <thead>
        <tr>
          ${this.columns.map((col) => html`
            <th
              class=${col.type ? '' : (col.sortable ? 'sortable' : '')}
              style=${this.getColumnStyle(col)}
            >
              ${col.type === 'selection' ? html`
                <input
                  type="checkbox"
                  .checked=${this.isPageAllSelected(viewData)}
                  @change=${() => this.toggleSelectAll(viewData)}
                />
              ` : col.type === 'expand' ? html`
                <span></span>
              ` : html`
                <span @click=${() => this.toggleSort(col)}>${col.title}</span>
                ${col.sortable ? html`<span class="sort-indicator">${this.getSortIndicator(col)}</span>` : null}
              `}
            </th>
          `)}
        </tr>
      </thead>
    `;
  }

  private renderBody() {
    const viewData = this.getPagedData(this.getSortedData());
    const virtualState = this.getVirtualState(viewData);
    if (!this.columns.length || !viewData.length) {
      const colspan = Math.max(this.columns.length, 1);
      return html`
        <tbody>
          <tr>
            <td class="empty" colspan=${colspan}>${this.emptyText}</td>
          </tr>
        </tbody>
      `;
    }
    return html`
      <tbody>
        ${virtualState.offsetTop > 0 ? html`
          <tr class="spacer">
            <td colspan=${this.columns.length} style=${`height:${virtualState.offsetTop}px;`}></td>
          </tr>
        ` : null}
        ${virtualState.visible.map((row, rowIndex) => html`
          <tr>
            ${this.columns.map((col) => html`
              <td style=${this.getColumnStyle(col)}>
                ${col.type === 'selection' ? html`
                  <input
                    type="checkbox"
                    .checked=${this.selectedRows.has(row)}
                    @change=${() => this.toggleRowSelection(row)}
                  />
                ` : col.type === 'expand' ? html`
                  <span class="expand-toggle" @click=${() => this.toggleRowExpand(row)}>
                    ${this.expandedRows.has(row) ? '−' : '+'}
                  </span>
                ` : this.renderCell(col, row, rowIndex)}
              </td>
            `)}
          </tr>
          ${this.expandedRows.has(row) ? html`
            <tr class="expand-row">
              <td colspan=${this.columns.length}>
                ${this.renderExpandContent(row, rowIndex)}
              </td>
            </tr>
          ` : null}
        `)}
        ${virtualState.offsetBottom > 0 ? html`
          <tr class="spacer">
            <td colspan=${this.columns.length} style=${`height:${virtualState.offsetBottom}px;`}></td>
          </tr>
        ` : null}
      </tbody>
    `;
  }

  private renderPagination() {
    if (!this.pagination) return null;
    const totalPages = this.getTotalPages(this.data.length);
    if (totalPages <= 1) return null;
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
    return html`
      <div class="pagination">
        <button @click=${() => this.setPage(this.currentPage - 1)} ?disabled=${this.currentPage <= 1}>上一页</button>
        ${pages.map((page) => html`
          <button
            class=${page === this.currentPage ? 'active' : ''}
            @click=${() => this.setPage(page)}
          >${page}</button>
        `)}
        <button @click=${() => this.setPage(this.currentPage + 1)} ?disabled=${this.currentPage >= totalPages}>下一页</button>
        <span class="page-info">${this.currentPage}/${totalPages}</span>
      </div>
    `;
  }

  private getColumnStyle(col: TableColumn) {
    const align = col.align ?? 'left';
    const width = col.width ? `width:${col.width};` : '';
    return `${width}text-align:${align};`;
  }

  private getSortedData() {
    if (!this.sortKey || this.sortOrder === 'none') return [...this.data];
    const sorted = [...this.data];
    const order = this.sortOrder === 'asc' ? 1 : -1;
    sorted.sort((a, b) => {
      const valueA = a[this.sortKey];
      const valueB = b[this.sortKey];
      return this.compareValues(valueA, valueB) * order;
    });
    return sorted;
  }

  private getPagedData(source: Record<string, unknown>[]) {
    if (!this.pagination) return source;
    const totalPages = this.getTotalPages(source.length);
    const currentPage = Math.min(Math.max(this.currentPage, 1), totalPages);
    const start = (currentPage - 1) * this.pageSize;
    return source.slice(start, start + this.pageSize);
  }

  private getTotalPages(total: number) {
    if (!this.pagination) return 1;
    if (this.pageSize <= 0) return 1;
    return Math.max(1, Math.ceil(total / this.pageSize));
  }

  private compareValues(a: unknown, b: unknown) {
    if (a === b) return 0;
    if (a === null || a === undefined) return -1;
    if (b === null || b === undefined) return 1;
    if (typeof a === 'number' && typeof b === 'number') return a - b;
    return String(a).localeCompare(String(b), 'zh-Hans-CN', { numeric: true });
  }

  private toggleSort(col: TableColumn) {
    if (!col.sortable) return;
    if (this.sortKey !== col.key) {
      this.sortKey = col.key;
      this.sortOrder = 'asc';
    } else {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : this.sortOrder === 'desc' ? 'none' : 'asc';
      if (this.sortOrder === 'none') this.sortKey = '';
    }
    this.dispatchEvent(new CustomEvent('sort-change', {
      detail: { key: this.sortKey, order: this.sortOrder },
      bubbles: true,
      composed: true
    }));
  }

  private getSortIndicator(col: TableColumn) {
    if (this.sortKey !== col.key || this.sortOrder === 'none') return '⇅';
    return this.sortOrder === 'asc' ? '▲' : '▼';
  }

  private setPage(page: number) {
    const totalPages = this.getTotalPages(this.data.length);
    const nextPage = Math.min(Math.max(page, 1), totalPages);
    if (nextPage === this.currentPage) return;
    this.currentPage = nextPage;
    this.dispatchEvent(new CustomEvent('page-change', {
      detail: { page: this.currentPage, pageSize: this.pageSize },
      bubbles: true,
      composed: true
    }));
  }

  private formatCell(value: unknown) {
    if (value === null || value === undefined) return '';
    return String(value);
  }

  private renderCell(col: TableColumn, row: Record<string, unknown>, rowIndex: number) {
    if (typeof col.render === 'function') return col.render(row);
    const slotName = col.slot ?? `cell-${col.key}`;
    const template = this.querySelector<HTMLTemplateElement>(`template[slot="${slotName}"]`);
    if (template) {
      const content = this.interpolateTemplate(template.innerHTML, row, rowIndex, col.key);
      return unsafeHTML(content);
    }
    return this.formatCell(row[col.key]);
  }

  private interpolateTemplate(template: string, row: Record<string, unknown>, rowIndex: number, key: string) {
    let output = template;
    output = output.replace(/{{\s*index\s*}}/g, String(rowIndex + 1));
    output = output.replace(/{{\s*value\s*}}/g, this.escapeHtml(row[key]));
    Object.keys(row).forEach((rowKey) => {
      const pattern = new RegExp(`{{\\s*row\\.${rowKey}\\s*}}`, 'g');
      output = output.replace(pattern, this.escapeHtml(row[rowKey]));
    });
    return output;
  }

  private escapeHtml(value: unknown) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
  private isPageAllSelected(viewData: Record<string, unknown>[]) {
    if (!viewData.length) return false;
    for (const row of viewData) {
      if (!this.selectedRows.has(row)) return false;
    }
    return true;
  }
  private toggleRowSelection(row: Record<string, unknown>) {
    if (this.selectedRows.has(row)) {
      this.selectedRows.delete(row);
    } else {
      this.selectedRows.add(row);
    }
    this.dispatchEvent(new CustomEvent('selection-change', {
      detail: { selection: Array.from(this.selectedRows) },
      bubbles: true,
      composed: true
    }));
    this.requestUpdate();
  }
  private toggleSelectAll(viewData: Record<string, unknown>[]) {
    const allSelected = this.isPageAllSelected(viewData);
    if (allSelected) {
      for (const row of viewData) this.selectedRows.delete(row);
    } else {
      for (const row of viewData) this.selectedRows.add(row);
    }
    this.dispatchEvent(new CustomEvent('selection-change', {
      detail: { selection: Array.from(this.selectedRows) },
      bubbles: true,
      composed: true
    }));
    this.requestUpdate();
  }
  private toggleRowExpand(row: Record<string, unknown>) {
    const expanded = this.expandedRows.has(row);
    if (expanded) {
      this.expandedRows.delete(row);
    } else {
      this.expandedRows.add(row);
    }
    this.dispatchEvent(new CustomEvent('expand-change', {
      detail: { row, expanded: !expanded, expandedRows: Array.from(this.expandedRows) },
      bubbles: true,
      composed: true
    }));
    this.requestUpdate();
  }
  private renderExpandContent(row: Record<string, unknown>, rowIndex: number) {
    const template = this.querySelector<HTMLTemplateElement>('template[slot="expand"]');
    if (template) {
      const content = this.interpolateTemplate(template.innerHTML, row, rowIndex, '');
      return unsafeHTML(content);
    }
    return '';
  }
  private getVirtualState(viewData: Record<string, unknown>[]) {
    if (!this.virtual) {
      return {
        visible: viewData,
        offsetTop: 0,
        offsetBottom: 0
      };
    }
    const height = Math.max(1, this.virtualHeight);
    const rowHeight = Math.max(1, this.rowHeight);
    const total = viewData.length;
    const visibleCount = Math.ceil(height / rowHeight);
    const buffer = Math.max(0, this.virtualBuffer);
    const start = Math.max(0, Math.floor(this.virtualScrollTop / rowHeight) - buffer);
    const end = Math.min(total, start + visibleCount + buffer * 2);
    return {
      visible: viewData.slice(start, end),
      offsetTop: start * rowHeight,
      offsetBottom: Math.max(0, (total - end) * rowHeight)
    };
  }
  private onScroll(event: Event) {
    const target = event.currentTarget as HTMLElement | null;
    if (!target) return;
    this.virtualScrollTop = target.scrollTop;
    this.requestUpdate();
  }
  private onWheel = (event: WheelEvent) => {
    if (!this.virtual || !this.wrapperEl) return;
    event.preventDefault();
    const maxScrollTop = Math.max(0, this.wrapperEl.scrollHeight - this.wrapperEl.clientHeight);
    const nextScrollTop = Math.min(Math.max(this.wrapperEl.scrollTop + event.deltaY, 0), maxScrollTop);
    if (nextScrollTop !== this.wrapperEl.scrollTop) {
      this.wrapperEl.scrollTop = nextScrollTop;
      this.virtualScrollTop = nextScrollTop;
      this.requestUpdate();
    }
  };

  render() {
    const wrapperClass = [
      'table-wrapper',
      this.fixedHeader ? 'fixed' : '',
      this.virtual ? 'virtual' : ''
    ].filter(Boolean).join(' ');
    const wrapperStyleParts = [];
    if (this.fixedHeader && this.maxHeight) wrapperStyleParts.push(`max-height:${this.maxHeight};`);
    if (this.virtual) wrapperStyleParts.push(`height:${this.virtualHeight}px;`);
    const wrapperStyle = wrapperStyleParts.join('');
    return html`
      <div class=${wrapperClass} style=${wrapperStyle} @scroll=${this.virtual ? this.onScroll : null}>
        <table class=${this.getTableClass()}>
          ${this.renderHeader()}
          ${this.renderBody()}
        </table>
      </div>
      ${this.renderPagination()}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-table': MyTable;
  }
}

customElements.define('my-table', MyTable);
