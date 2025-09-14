import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { usePage, useForm, router } from '@inertiajs/react';
import React, { useState } from 'react';

const List = () => {
  const { daftarMenu } = usePage().props;
  const [pemesanan, setPemesanan] = useState([]);
  const { data, setData, post, processing } = useForm({ items: [] });

  const tambahPesanan = (menu) => {
    setPemesanan((prev) => {
      const existing = prev.find((p) => p.id === menu.id);
      if (existing) {
        return prev.map((p) =>
          p.id === menu.id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...menu, qty: 1 }];
    });
  };

    const submitPesanan = () => {
    router.post(route('kasir.store'),
            { items: pemesanan },
            {
            preserveScroll: true,
            onSuccess: () => setPemesanan([]),
            }
        );
    };

  return (
    <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Menu</h2>}>
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Kiri daftar menu */}
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    <p className="text-sm text-gray-500 mt-1">
                      Rp {Number(menu.harga).toLocaleString()}
                    </p>
                    {menu.deskripsi && (
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">{menu.deskripsi}</p>
                    )}
                  </div>

                  <div className="mt-4 flex justify-end">
                    {menu.ready ? (
                      <button
                        onClick={() => tambahPesanan(menu)}
                        className="px-4 py-2 bg-green-500 text-white text-xs rounded hover:bg-green-600"
                      >
                        Pesan
                      </button>
                    ) : (
                      <button
                        disabled
                        className="px-4 py-2 bg-gray-400 text-white text-xs rounded cursor-not-allowed"
                      >
                        Habis
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Kanan daftar pemesanan */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-5 sticky top-4">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Daftar Pemesanan</h3>
              {pemesanan.length === 0 ? (
                <p className="text-sm text-gray-500">Belum ada pesanan</p>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {pemesanan.map((p) => (
                    <li key={p.id} className="py-2 flex justify-between items-center">
                      <span className="text-sm text-gray-700">
                        {p.nama} x {p.qty}
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        Rp {(p.harga * p.qty).toLocaleString()}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              {pemesanan.length > 0 && (
                <div className="mt-4 border-t pt-2">
                  <button
                    onClick={submitPesanan}
                    disabled={processing}
                    className="w-full px-4 py-2 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
                  >
                    {processing ? 'Memproses...' : 'Submit Pesanan'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default List;
