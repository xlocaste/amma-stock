import PrimaryButton from '@/Components/PrimaryButton'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Link, usePage } from '@inertiajs/react'
import React from 'react'

const List = () => {
    const { daftarMenu } = usePage().props

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Menu
                </h2>
            }
        >
            <div className="flex justify-end mb-4">
                <Link href={route('menu.create')}>
                    <PrimaryButton>+ Tambah Menu</PrimaryButton>
                </Link>
            </div>

            <div className='bg-white rounded-lg p-6'>
                <table className="table-auto w-full border">
                    <thead>
                    <tr className="">
                        <th className="border px-4 py-2">Nama</th>
                        <th className="border px-4 py-2">Harga</th>
                        <th className="border px-4 py-2">Deskripsi</th>
                    </tr>
                    </thead>
                    <tbody>
                        {daftarMenu.map((menu, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="border px-4 py-2">{menu.nama}</td>
                                <td className="border px-4 py-2">{menu.harga}</td>
                                <td className="border px-4 py-2">{menu.deskripsi}</td>
                                <td className="border px-4 py-2 space-x-2 text-center">
                                    <Link href={route('menu.edit', menu.id)}>
                                        <PrimaryButton>Edit</PrimaryButton>
                                    </Link>
                                    <PrimaryButton
                                        className="bg-red-600 hover:bg-red-700"
                                        onClick={() => handleDelete(menu.id)}
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
