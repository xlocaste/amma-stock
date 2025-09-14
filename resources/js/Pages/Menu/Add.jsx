import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';
import React from 'react';

const Add = ({ gudang }) => {
    const { data, setData, post, processing, errors } = useForm({
        nama: '',
        harga: '',
        deskripsi: '',
        bahan: [
            { gudang_id: '', jumlah_bahan: '' },
        ],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('menu.store'));
    };

    const handleAddBahan = () => {
        setData('bahan', [...data.bahan, { gudang_id: '', jumlah_bahan: '' }]);
    };

    const handleRemoveBahan = (index) => {
        const newBahan = [...data.bahan];
        newBahan.splice(index, 1);
        setData('bahan', newBahan);
    };

    const handleChangeBahan = (index, field, value) => {
        const newBahan = [...data.bahan];
        newBahan[index][field] = value;
        setData('bahan', newBahan);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Tambah Menu
                </h2>
            }
        >
            <div className="max-w-3xl mx-auto py-8">
                <div className="bg-white shadow-md rounded-lg p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="nama" className="block text-sm font-medium text-gray-700">
                                Nama Menu
                            </label>
                            <input
                                type="text"
                                id="nama"
                                name="nama"
                                value={data.nama}
                                onChange={(e) => setData('nama', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            />
                            {errors.nama && (
                                <p className="mt-1 text-sm text-red-600">{errors.nama}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="harga" className="block text-sm font-medium text-gray-700">
                                Harga
                            </label>
                            <input
                                type="number"
                                id="harga"
                                name="harga"
                                value={data.harga}
                                onChange={(e) => setData('harga', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            />
                            {errors.harga && (
                                <p className="mt-1 text-sm text-red-600">{errors.harga}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-700">
                                Deskripsi
                            </label>
                            <textarea
                                id="deskripsi"
                                name="deskripsi"
                                value={data.deskripsi}
                                onChange={(e) => setData('deskripsi', e.target.value)}
                                rows={4}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            />
                            {errors.deskripsi && (
                                <p className="mt-1 text-sm text-red-600">{errors.deskripsi}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Bahan dari Gudang
                            </label>

                            {data.bahan.map((item, index) => (
                                <div key={index} className="grid grid-cols-5 gap-2 mb-2">
                                    <div className="col-span-3">
                                        <select
                                            value={item.gudang_id}
                                            onChange={(e) => handleChangeBahan(index, 'gudang_id', e.target.value)}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                        >
                                            <option value="">-- Pilih Gudang --</option>
                                            {gudang.map((g) => (
                                                <option key={g.id} value={g.id}>
                                                    {g.nama}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <input
                                            type="number"
                                            placeholder="Jumlah"
                                            value={item.jumlah_bahan}
                                            onChange={(e) => handleChangeBahan(index, 'jumlah_bahan', e.target.value)}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveBahan(index)}
                                            className="px-2 py-1 bg-red-500 text-white rounded"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </div>
                            ))}

                            <button
                                type="button"
                                onClick={handleAddBahan}
                                className="mt-2 px-3 py-1 bg-green-500 text-white rounded"
                            >
                                + Tambah Bahan
                            </button>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-500 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                {processing ? 'Menyimpan...' : 'Simpan'}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Add;
