'use client';

import { DataTable } from '@/components/admin/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { Assessment } from '@/lib/supabase';
import { ArrowUpDown, Eye } from 'lucide-react';
import { useState } from 'react';

const columns: ColumnDef<Assessment>[] = [
  {
    accessorKey: 'company_name',
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-1 hover:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Company
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => <div className="font-medium text-white">{row.getValue('company_name')}</div>,
  },
  {
    accessorKey: 'email',
    header: 'Contact',
  },
  {
    accessorKey: 'archetype.name', // Access nested property
    header: 'Archetype',
    cell: ({ row }) => {
      const archetype: any = row.original.archetype;
      const name = archetype?.name || 'Unclassified';
      
      const colors: any = {
        'Apex Integrator': 'bg-purple-500/20 text-purple-300',
        'Visionary Architect': 'bg-blue-500/20 text-blue-300',
        'Tactical Powerhouse': 'bg-amber-500/20 text-amber-300',
        'Calculated Scout': 'bg-slate-500/20 text-slate-300',
      };

      return (
        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${colors[name] || 'bg-gray-800 text-gray-400'}`}>
          {name}
        </span>
      );
    },
  },
  {
    accessorKey: 'overall_score',
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-1 hover:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Score
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => {
      const score = row.getValue('overall_score') as number;
      return (
        <div className="flex items-center gap-2">
          <span className={`font-bold ${score > 75 ? 'text-green-400' : score > 50 ? 'text-yellow-400' : 'text-red-400'}`}>
            {score}
          </span>
          <div className="h-1.5 w-16 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-current" style={{ width: `${score}%` }} />
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'created_at',
    header: 'Date',
    cell: ({ row }) => new Date(row.getValue('created_at')).toLocaleDateString(),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <button 
          className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
          title="View Details (Coming Soon)"
        >
          <Eye className="h-4 w-4" />
        </button>
      );
    },
  },
];

interface AdminViewProps {
  initialData: Assessment[];
}

export default function AdminView({ initialData }: AdminViewProps) {
  const [data] = useState<Assessment[]>(initialData);

  return (
    <div className="min-h-screen bg-[#050507] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Sales Command Center</h1>
          <p className="text-gray-400">Track and manage AI readiness leads.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#0c0c10] border border-white/10 p-6 rounded-xl">
            <h3 className="text-xs uppercase text-gray-500 font-semibold">Total Leads</h3>
            <p className="text-3xl font-bold mt-2">{data.length}</p>
          </div>
          <div className="bg-[#0c0c10] border border-white/10 p-6 rounded-xl">
            <h3 className="text-xs uppercase text-gray-500 font-semibold">Avg. Score</h3>
            <p className="text-3xl font-bold mt-2 text-indigo-400">
              {Math.round(data.reduce((acc, curr) => acc + curr.overall_score, 0) / (data.length || 1))}
            </p>
          </div>
          <div className="bg-[#0c0c10] border border-white/10 p-6 rounded-xl">
            <h3 className="text-xs uppercase text-gray-500 font-semibold">Apex Integrators</h3>
            <p className="text-3xl font-bold mt-2 text-purple-400">
              {data.filter((d: any) => d.archetype?.name === 'Apex Integrator').length}
            </p>
          </div>
          <div className="bg-[#0c0c10] border border-white/10 p-6 rounded-xl">
            <h3 className="text-xs uppercase text-gray-500 font-semibold">Conversion Potential</h3>
            <p className="text-3xl font-bold mt-2 text-green-400">High</p>
          </div>
        </div>

        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
