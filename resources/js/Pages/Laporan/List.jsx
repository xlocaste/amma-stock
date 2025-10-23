import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React from 'react';
import { usePage } from '@inertiajs/react';

const List = () => {
  const { laporan } = usePage().props;

  return (
    <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Laporan Hari Ini</h2>}>
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-left">No</th>
                <th className="border px-4 py-2 text-left">Nama Menu</th>
                <th className="border px-4 py-2 text-center">Qty</th>
                <th className="border px-4 py-2 text-right">Total Harga</th>
                <th className="border px-4 py-2 text-center">Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {laporan.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    Belum ada laporan hari ini
                  </td>
                </tr>
              ) : (
                laporan.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{item.menu.nama}</td>
                    <td className="border px-4 py-2 text-center">{item.qty}</td>
                    <td className="border px-4 py-2 text-right">
                      Rp {Number(item.total_harga).toLocaleString()}
                    </td>
                    <td className="border px-4 py-2 text-center">{item.tanggal}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default List;
