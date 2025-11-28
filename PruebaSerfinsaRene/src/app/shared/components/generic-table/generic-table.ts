import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TableColumn<T = any> {
  key: keyof T | string;
  header: string;
  cell?: (row: T) => unknown;
  cellClass?: string;
  align?: 'left' | 'center' | 'right';
}

@Component({
  selector: 'app-generic-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="overflow-x-auto">
      <table
        class="min-w-full text-sm border border-gray-200 bg-white rounded-lg overflow-hidden"
      >
        <thead class="bg-gray-50">
          <tr>
            @for (col of columns(); track $index) {
            <th
              class="px-4 py-2.5 text-xs font-semibold text-gray-700 border-b border-gray-200"
              [ngClass]="getAlignClass(col)"
            >
              {{ col.header }}
            </th>
            }
          </tr>
        </thead>

        <tbody>
          @if (data().length === 0) {
          <tr>
            <td
              class="px-4 py-4 text-center text-gray-500 text-sm"
              [attr.colspan]="columns().length"
            >
              No hay registros para mostrar.
            </td>
          </tr>
          } @else { @for (row of data(); track trackRow($index, row)) {
          <tr class="hover:bg-gray-50 transition-colors">
            @for (col of columns(); track $index) {
            <td
              class="px-4 py-2.5 text-gray-800 border-b border-gray-100 align-middle"
            >
              {{ getCellValue(col, row) }}
            </td>
            }
          </tr>
          } }
        </tbody>
      </table>
    </div>
  `,
})
export class GenericTableComponent<T = any> {
  columns = input.required<TableColumn<T>[]>();

  data = input<T[]>([] as T[]);

  rowId = input<((row: T) => unknown) | null>(null);

  trackRow = (index: number, row: T) => {
    const fn = this.rowId();
    return fn ? fn(row) : index;
  };

  getAlignClass(col: TableColumn<T>): string {
    switch (col.align) {
      case 'center':
        return 'text-center';
      case 'right':
        return 'text-right';
      default:
        return 'text-left';
    }
  }

  getCellValue(col: TableColumn<T>, row: T): unknown {
    if (col.cell) return col.cell(row);

    const key = col.key as keyof T;
    return row?.[key] ?? '';
  }
}
