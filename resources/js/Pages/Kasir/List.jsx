import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { usePage, Link } from '@inertiajs/react';
import React from 'react';

const List = () => {
  const { daftarMenu } = usePage().props;

  return (
    <AuthenticatedLayout
      header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Menu</h2>}
    >
      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {daftarMenu.length === 0 && (
            <div className="col-span-full text-center text-gray-500">Belum ada menu</div>
          )}
          {daftarMenu.map((menu) => (
            <div
              key={menu.id}
              className="bg-white rounded-2xl shadow-md p-5 flex flex-col justify-between hover:shadow-lg transition"
            >
              <div>
                <h3 className="text-lg font-bold text-gray-800">{menu.nama}</h3>
                <p className="text-sm text-gray-500 mt-1">Rp {Number(menu.harga).toLocaleString()}</p>
                {menu.deskripsi && (
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">{menu.deskripsi}</p>
                )}

                {menu.gudang && menu.gudang.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs font-semibold text-gray-700">Bahan:</p>
                    <ul className="text-xs text-gray-600 list-disc list-inside space-y-1">
                      {menu.gudang.map((g) => (
                        <li key={g.id}>
                          {g.nama} — {g.pivot.jumlah_bahan}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="mt-4 flex justify-end">
                <Link
                    href={route('kasir.index', menu.id)}
                    className="px-4 py-2 bg-green-500 text-white text-xs rounded hover:bg-green-600"
                >
                    Pesan
                </Link>
            </div>
            </div>
          ))}
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default List;
