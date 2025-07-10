import React from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

function Table({ headers, data, onUpdate, onDelete, customAction, showActions = false }) {
  console.log(data)
  if (!data || data.length === 0) {
    return (
      <div className="bg-gray-100 p-8 rounded-xl shadow-inner text-center text-gray-500">
        No data to display.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white/70 backdrop-blur-md rounded-xl shadow-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header) => (
              <th
                key={header.key}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr key={row.id || rowIndex}>
              {headers.map((header) => (
                <td key={header.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {header.key === 'sno' ? (
                    rowIndex + 1
                  ) : header.key === 'actions' && showActions ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onUpdate && onUpdate(row)}
                        className="text-cyan-600 hover:text-cyan-900 p-1 rounded-full hover:bg-cyan-100 transition-colors"
                        aria-label="Edit"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>

                      {onDelete && (
                        <button
                          onClick={() => onDelete(row)}
                          className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-100 transition-colors"
                          aria-label="Delete"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      )}

                      {customAction && (
                        <button
                          onClick={() => customAction(row)}
                          className={`text-white px-3 py-1 rounded-full text-xs font-semibold 
                            ${row.active ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-green-600 hover:bg-green-700'}`}
                        >
                          {row.active ? 'Deactivate' : 'Activate'}
                        </button>
                      )}
                    </div>
                  ) : (
                    row[header.key]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
