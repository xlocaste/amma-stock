import { usePage } from '@inertiajs/react'
import React from 'react'

const List = () => {
    const { daftarGudang } = usePage().props

    return (
        <div>
           <table className="table-auto w-full border">
                <thead>
                <tr className="bg-gray-100">
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
    )
}

export default List
