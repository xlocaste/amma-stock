import PrimaryButton from '@/Components/PrimaryButton'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Link, router, usePage } from '@inertiajs/react'
import React from 'react'

const List = () => {
    const { daftarGudang } = usePage().props

    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus data ini?')) {
        router.delete(route('gudang.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Gudang
                </h2>
            }
        >
            <div className="flex justify-end mb-4">
                <Link href={route('gudang.create')}>
                    <PrimaryButton>+ Tambah Gudang</PrimaryButton>
                </Link>
            </div>

            <div className='bg-white rounded-lg p-6'>
                <table className="table-auto w-full border bg-white">
                    <thead>
                        <tr className="">
                            <th className="border px-4 py-2">Nama</th>
                            <th className="border px-4 py-2">Stok</th>
                            <th className="border px-4 py-2">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {daftarGudang.map((gudang, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="border px-4 py-2">{gudang.nama}</td>
                                <td className="border px-4 py-2">{gudang.kuantitas}</td>
                                <td className="border px-4 py-2 space-x-2 text-center">
                                    <Link href={route('gudang.edit', gudang.id)}>
                                        <PrimaryButton>Edit</PrimaryButton>
                                    </Link>
                                    <PrimaryButton
                                        className="bg-red-600 hover:bg-red-700"
                                        onClick={() => handleDelete(gudang.id)}
                                    >
                                        Hapus
                                    </PrimaryButton>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    )
}

export default List
