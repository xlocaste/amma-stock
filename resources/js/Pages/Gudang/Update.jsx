import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react'
import React from 'react'

const Update = ({ gudang }) => {
    const { data, setData, put, processing, errors } = useForm({
        nama: gudang.nama || "",
        kuantitas: gudang.kuantitas || "",
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("gudang.update", gudang.id));
    };

    return (
        <AuthenticatedLayout>
            <div className="max-w-3xl mx-auto py-8">
                <div className="bg-white shadow-md rounded-lg p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="nama" className="block text-sm font-medium text-gray-700">
                                Nama Gudang
                            </label>
                            <input
                                type="text"
                                id="nama"
                                name="nama"
                                value={data.nama}
                                onChange={(e) => setData("nama", e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            />
                            {errors.nama && <p className="mt-1 text-sm text-red-600">{errors.nama}</p>}
                        </div>

                        <div>
                            <label htmlFor="kuantitas" className="block text-sm font-medium text-gray-700">
                                Kuantitas
                            </label>
                            <input
                                type="number"
                                id="kuantitas"
                                name="kuantitas"
                                value={data.kuantitas}
                                onChange={(e) => setData("kuantitas", e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            />
                            {errors.kuantitas && (
                                <p className="mt-1 text-sm text-red-600">{errors.kuantitas}</p>
                            )}
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-500 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                {processing ? "Menyimpan..." : "Update"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default Update
