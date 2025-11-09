import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import React from "react";
import {
    CurrencyDollarIcon,
    ShoppingCartIcon,
    ClipboardDocumentListIcon,
    ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

export default function Dashboard() {
    // Mengambil data dari props yang dikirimkan dari backend
    const {
        auth,
        penjualanHariIni,
        totalTransaksiHariIni,
        totalMenu,
        stokMenipis,
        transaksiTerakhir,
    } = usePage().props;

    const statCards = [
        {
            name: "Total Penjualan Hari Ini",
            value: `Rp ${Number(penjualanHariIni || 0).toLocaleString(
                "id-ID"
            )}`,
            icon: CurrencyDollarIcon,
            color: "bg-amber-100",
            iconColor: "text-amber-600",
        },
        {
            name: "Total Transaksi",
            value: `${totalTransaksiHariIni || 0} Transaksi`,
            icon: ShoppingCartIcon,
            color: "bg-green-100",
            iconColor: "text-green-600",
        },
        {
            name: "Total Menu Aktif",
            value: `${totalMenu || 0} Menu`,
            icon: ClipboardDocumentListIcon,
            color: "bg-blue-100",
            iconColor: "text-blue-600",
        },
        {
            name: "Stok Menipis",
            value: `${stokMenipis || 0} Item`,
            icon: ExclamationTriangleIcon,
            color: "bg-red-100",
            iconColor: "text-red-600",
        },
    ];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard Amma Coffe
                </h2>
            }
        >
            <Head title="Dashboard - Amma Coffe" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h3 className="text-2xl font-bold text-gray-900">
                            Selamat datang kembali, {auth.user.name}!
                        </h3>
                        <p className="mt-1 text-sm text-gray-600">
                            Ini adalah ringkasan kinerja toko Anda hari ini.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                        {statCards.map((card) => (
                            <div
                                key={card.name}
                                className="bg-white overflow-hidden shadow-sm rounded-lg"
                            >
                                <div className="p-5">
                                    <div className="flex items-center">
                                        <div
                                            className={`flex-shrink-0 ${card.color} rounded-md p-3`}
                                        >
                                            <card.icon
                                                className={`h-6 w-6 ${card.iconColor}`}
                                                aria-hidden="true"
                                            />
                                        </div>
                                        <div className="ml-5 w-0 flex-1">
                                            <dl>
                                                <dt className="text-sm font-medium text-gray-500 truncate">
                                                    {card.name}
                                                </dt>
                                                <dd className="text-lg font-bold text-gray-900">
                                                    {card.value}
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white shadow-sm rounded-lg">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900">
                                Transaksi Terkini
                            </h3>
                        </div>
                        <div className="overflow-x-auto">
                            {transaksiTerakhir &&
                            transaksiTerakhir.length > 0 ? (
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                No. Nota
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Menu
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Total
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Waktu
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {transaksiTerakhir.map((item) => (
                                            <tr key={item.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    #{item.id}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {item.menu.nama}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                                                    Rp{" "}
                                                    {Number(
                                                        item.total_harga
                                                    ).toLocaleString("id-ID")}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(
                                                        item.tanggal
                                                    ).toLocaleTimeString(
                                                        "id-ID",
                                                        {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        }
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="text-center py-6">
                                    <p className="text-sm text-gray-500">
                                        Belum ada transaksi hari ini.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
