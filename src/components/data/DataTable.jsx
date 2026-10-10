import React, { useState, useMemo } from 'react';
import { cn } from '../../lib/utils';
import { ChevronDown, ChevronUp, ChevronsUpDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { EmptyState } from './DataState';
import { Button } from '../ui/Button';

export function DataTable({
  columns = [],
  data = [],
  keyField = 'id',
  onRowClick,
  emptyTitle,
  emptyDescription,
  pageSize = 10,
  className,
}) {
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc'); // 'asc' | 'desc'
  const [currentPage, setCurrentPage] = useState(1);

  const handleSort = (field) => {
    if (!field) return;
    if (sortField === field) {
      if (sortDirection === 'asc') setSortDirection('desc');
      else {
        setSortField(null);
        setSortDirection('asc');
      }
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedData = useMemo(() => {
    if (!sortField) return data;
    return [...data].sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal?.toLowerCase() || '';
      }
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortField, sortDirection]);

  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  return (
    <div className={cn('w-full flex flex-col rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs', className)}>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-800">
          <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-700">
            <tr>
              {columns.map((col, idx) => {
                const isSortable = col.sortable !== false && col.accessor;
                return (
                  <th
                    key={col.header || idx}
                    onClick={() => isSortable && handleSort(col.accessor)}
                    className={cn(
                      'py-4 px-4 font-bold select-none text-slate-700',
                      isSortable && 'cursor-pointer hover:text-slate-900',
                      col.align === 'right' && 'text-right',
                      col.align === 'center' && 'text-center',
                      col.className
                    )}
                  >
                    <div className={cn('inline-flex items-center gap-1.5', col.align === 'right' && 'justify-end')}>
                      <span>{col.header}</span>
                      {isSortable && (
                        <span className="text-slate-400">
                          {sortField === col.accessor ? (
                            sortDirection === 'asc' ? (
                              <ChevronUp className="w-3.5 h-3.5 text-sky-600" />
                            ) : (
                              <ChevronDown className="w-3.5 h-3.5 text-sky-600" />
                            )
                          ) : (
                            <ChevronsUpDown className="w-3 h-3 opacity-40 hover:opacity-100" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-sans">
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIdx) => (
                <tr
                  key={row[keyField] || rowIdx}
                  onClick={() => onRowClick?.(row)}
                  className={cn(
                    'transition-colors hover:bg-slate-50/80 text-slate-900',
                    onRowClick && 'cursor-pointer'
                  )}
                >
                  {columns.map((col, colIdx) => (
                    <td
                      key={colIdx}
                      className={cn(
                        'py-4 px-4 font-medium text-slate-900',
                        col.align === 'right' && 'text-right',
                        col.align === 'center' && 'text-center',
                        col.cellClassName
                      )}
                    >
                      {col.render ? col.render(row) : row[col.accessor] ?? '—'}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="py-12 px-4">
                  <EmptyState
                    title={emptyTitle || 'No records available'}
                    description={emptyDescription || 'No data found in this category.'}
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {sortedData.length > pageSize && (
        <div className="flex items-center justify-between border-t border-slate-200 px-5 py-3.5 bg-slate-50 text-xs text-slate-600">
          <div>
            Showing <span className="font-bold text-slate-900">{(currentPage - 1) * pageSize + 1}</span> to{' '}
            <span className="font-bold text-slate-900">{Math.min(currentPage * pageSize, sortedData.length)}</span> of{' '}
            <span className="font-bold text-slate-900">{sortedData.length}</span> results
          </div>
          <div className="flex items-center gap-1.5">
            <Button
              size="xs"
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              icon={ChevronLeft}
              className="bg-white border-slate-200 text-slate-700"
            >
              Prev
            </Button>
            <span className="px-2 text-xs font-mono font-bold text-slate-800">
              {currentPage} / {totalPages}
            </span>
            <Button
              size="xs"
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              icon={ChevronRight}
              className="bg-white border-slate-200 text-slate-700"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}



