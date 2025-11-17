import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, router } from "@inertiajs/react";
import React, { useState } from "react";
import {
    CurrencyDollarIcon,
    DocumentTextIcon,
    FunnelIcon,
} from "@heroicons/react/24/outline";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";

const List = () => {
    const { laporan, filters } = usePage().props;

    const [tanggalMulai, setTanggalMulai] = useState(
        filters?.tanggal_mulai || ""
    );
    const [tanggalSelesai, setTanggalSelesai] = useState(
        filters?.tanggal_selesai || ""
    );

    const handleFilter = (e) => {
        e.preventDefault();
        router.get(route("laporan.index"), {
            tanggal_mulai: tanggalMulai,
            tanggal_selesai: tanggalSelesai,
        });
    };

    const totalKeseluruhan = laporan.reduce(
        (acc, item) => acc + item.total_harga,
        0
    );
    const totalQty = laporan.reduce((acc, item) => acc + item.qty, 0);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Laporan Penjualan
                    </h2>
                    <div className="text-sm text-gray-500">
                        Total {laporan.length} transaksi
                    </div>
                </div>
            }
        >
            <Head title="Laporan - Amma Coffee" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-white shadow-sm rounded-lg p-6">
                        <form onSubmit={handleFilter} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                                <div>
                                    <InputLabel
                                        htmlFor="tanggal_mulai"
                                        value="Tanggal Mulai"
                                    />
                                    <input
                                        type="date"
                                        id="tanggal_mulai"
                                        name="tanggal_mulai"
                                        value={tanggalMulai}
                                        onChange={(e) =>
                                            setTanggalMulai(e.target.value)
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="tanggal_selesai"
                                        value="Tanggal Selesai"
                                    />
                                    <input
                                        type="date"
                                        id="tanggal_selesai"
                                        name="tanggal_selesai"
                                        value={tanggalSelesai}
                                        onChange={(e) =>
                                            setTanggalSelesai(e.target.value)
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <PrimaryButton
                                        type="submit"
                                        className="bg-amber-600 hover:bg-amber-700 focus:bg-amber-700 w-full md:w-auto"
                                    >
                                        <FunnelIcon className="h-4 w-4 mr-2" />
                                        Filter
                                    </PrimaryButton>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white shadow-sm rounded-lg p-6 flex items-center">
                            <div className="flex-shrink-0 bg-amber-100 rounded-md p-3">
                                <CurrencyDollarIcon
                                    className="h-6 w-6 text-amber-600"
                                    aria-hidden="true"
                                />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">
                                        Total Pendapatan
                                    </dt>
                                    <dd className="text-lg font-bold text-gray-900">
                                        Rp{" "}
                                        {totalKeseluruhan.toLocaleString(
                                            "id-ID"
                                        )}
                                    </dd>
                                </dl>
                            </div>
                        </div>

                        <div className="bg-white shadow-sm rounded-lg p-6 flex items-center">
                            <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                                <DocumentTextIcon
                                    className="h-6 w-6 text-green-600"
                                    aria-hidden="true"
                                />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">
                                        Total Item Terjual
                                    </dt>
                                    <dd className="text-lg font-bold text-gray-900">
                                        {totalQty} Item
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white shadow-sm rounded-lg">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900">
                                Detail Transaksi
                            </h3>
                        </div>
                        <div className="overflow-x-auto">
                            {laporan.length === 0 ? (
                                <div className="text-center py-12">
                                    <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
                                    <p className="mt-2 text-sm text-gray-500">
                                        Tidak ada transaksi pada tanggal ini.
                                    </p>
                                </div>
                            ) : (
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                No
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Nama Menu
                                            </th>
                                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Qty
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Total Harga
                                            </th>
                                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Tanggal
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {laporan.map((item, index) => (
                                            <tr
                                                key={item.id}
                                                className="hover:bg-gray-50"
                                            >
                                                <td className="px-6 py-4 text-sm text-gray-900">
                                                    {index + 1}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-900">
                                                    {item.menu?.nama}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-900 text-center">
                                                    {item.qty}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-900 text-right font-semibold">
                                                    Rp{" "}
                                                    {Number(
                                                        item.total_harga
                                                    ).toLocaleString("id-ID")}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500 text-center">
                                                    {new Date(
                                                        item.tanggal
                                                    ).toLocaleDateString(
                                                        "id-ID",
                                                        {
                                                            day: "numeric",
                                                            month: "long",
                                                            year: "numeric",
                                                        }
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default List;
