import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, useForm, router } from "@inertiajs/react";
import React, { useState } from "react";
import { PlusIcon, MinusIcon, TrashIcon } from "@heroicons/react/24/outline";
import PrimaryButton from "@/Components/PrimaryButton";

const List = () => {
    const { daftarMenu } = usePage().props;
    const [pemesanan, setPemesanan] = useState([]);
    const { processing } = useForm({ items: [] });

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

    const kurangiPesanan = (menuId) => {
        setPemesanan((prev) => {
            const existing = prev.find((p) => p.id === menuId);
            if (existing && existing.qty > 1) {
                return prev.map((p) =>
                    p.id === menuId ? { ...p, qty: p.qty - 1 } : p
                );
            }
            return prev.filter((p) => p.id !== menuId);
        });
    };

    const hapusItemPesanan = (menuId) => {
        setPemesanan((prev) => prev.filter((p) => p.id !== menuId));
    };

    const submitPesanan = () => {
        router.post(
            route("kasir.store"),
            { items: pemesanan },
            {
                preserveScroll: true,
                onSuccess: () => setPemesanan([]),
            }
        );
    };

    const totalHarga = pemesanan.reduce(
        (total, item) => total + item.harga * item.qty,
        0
    );

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Halaman Kasir
                </h2>
            }
        >
            <Head title="Kasir - Amma Coffe" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            {daftarMenu.length === 0 ? (
                                <div className="bg-white shadow-sm rounded-lg p-12 text-center">
                                    <svg
                                        className="mx-auto h-12 w-12 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                        />
                                    </svg>
                                    <p className="mt-2 text-gray-500">
                                        Belum ada menu yang tersedia.
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {daftarMenu.map((menu) => (
                                        <div
                                            key={menu.id}
                                            className="bg-white shadow-sm rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300"
                                        >
                                            <div className="p-6">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-gray-900">
                                                            {menu.nama}
                                                        </h3>
                                                        <p className="mt-1 text-sm font-bold text-amber-600">
                                                            Rp{" "}
                                                            {Number(
                                                                menu.harga
                                                            ).toLocaleString(
                                                                "id-ID"
                                                            )}
                                                        </p>
                                                    </div>
                                                    {menu.ready ? (
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                tambahPesanan(
                                                                    menu
                                                                )
                                                            }
                                                            className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                                                        >
                                                            <PlusIcon
                                                                className="h-5 w-5"
                                                                aria-hidden="true"
                                                            />
                                                        </button>
                                                    ) : (
                                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-500">
                                                            Habis
                                                        </span>
                                                    )}
                                                </div>
                                                {menu.deskripsi && (
                                                    <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                                                        {menu.deskripsi}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="lg:col-span-1">
                            <div className="bg-white shadow-sm rounded-lg p-6 sticky top-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    Ringkasan Pesanan
                                </h3>
                                {pemesanan.length === 0 ? (
                                    <div className="text-center py-4">
                                        <svg
                                            className="mx-auto h-12 w-12 text-gray-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                            />
                                        </svg>
                                        <p className="mt-2 text-sm text-gray-500">
                                            Keranjang masih kosong
                                        </p>
                                    </div>
                                ) : (
                                    <>
                                        <ul className="space-y-3">
                                            {pemesanan.map((item) => (
                                                <li
                                                    key={item.id}
                                                    className="flex items-center justify-between"
                                                >
                                                    <div className="flex-1">
                                                        <p className="text-sm font-medium text-gray-900">
                                                            {item.nama}
                                                        </p>
                                                        <div className="flex items-center mt-1">
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    kurangiPesanan(
                                                                        item.id
                                                                    )
                                                                }
                                                                className="p-1 text-gray-400 hover:text-gray-600"
                                                            >
                                                                <MinusIcon className="h-4 w-4" />
                                                            </button>
                                                            <span className="mx-2 text-sm text-gray-600">
                                                                {item.qty}
                                                            </span>
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    tambahPesanan(
                                                                        item
                                                                    )
                                                                }
                                                                className="p-1 text-gray-400 hover:text-gray-600"
                                                            >
                                                                <PlusIcon className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <span className="text-sm font-semibold text-gray-900">
                                                            Rp{" "}
                                                            {(
                                                                item.harga *
                                                                item.qty
                                                            ).toLocaleString(
                                                                "id-ID"
                                                            )}
                                                        </span>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                hapusItemPesanan(
                                                                    item.id
                                                                )
                                                            }
                                                            className="text-red-500 hover:text-red-700"
                                                        >
                                                            <TrashIcon className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="mt-6 pt-4 border-t border-gray-200">
                                            <div className="flex justify-between items-center">
                                                <p className="text-base font-semibold text-gray-900">
                                                    Total:
                                                </p>
                                                <p className="text-xl font-bold text-amber-600">
                                                    Rp{" "}
                                                    {totalHarga.toLocaleString(
                                                        "id-ID"
                                                    )}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-6 space-y-3">
                                            <PrimaryButton
                                                className="w-full bg-amber-600 hover:bg-amber-700 focus:bg-amber-700"
                                                disabled={processing}
                                                onClick={submitPesanan}
                                            >
                                                {processing
                                                    ? "Memproses..."
                                                    : "Proses Pesanan"}
                                            </PrimaryButton>
                                            <button
                                                type="button"
                                                onClick={() => setPemesanan([])}
                                                className="w-full text-center text-sm text-gray-500 hover:text-gray-700 underline"
                                            >
                                                Bersihkan Keranjang
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default List;
