import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { usePage } from '@inertiajs/react'
import React from 'react'

const List = () => {
    const { daftarGudang } = usePage().props

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Gudang
                </h2>
            }
        >
            <div className='bg-white rounded-lg p-6'>
                <table className="table-auto w-full border bg-white">
                    <thead>
                        <tr className="">
                            <th className="border px-4 py-2">Nama</th>
                            <th className="border px-4 py-2">Stok</th>
                        </tr>
                    </thead>
                    <tbody>
                        {daftarGudang.map((gudang, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="border px-4 py-2">{gudang.nama}</td>
                                <td className="border px-4 py-2">{gudang.kuantitas}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    )
}

export default List
