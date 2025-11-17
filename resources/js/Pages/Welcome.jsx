import { Head, Link } from "@inertiajs/react";

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Amma Coffe - POS" />
            <div className="relative min-h-screen bg-gray-100 text-gray-800 flex flex-col">
                <div
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80')",
                    }}
                >
                    <div className="absolute inset-0 bg-black opacity-60"></div>
                </div>

                <header className="relative z-10 bg-transparent">
                    <div className="container mx-auto px-6 py-6 flex justify-between items-center">
                        <div className="text-white text-3xl font-bold tracking-wide">
                            Amma Coffee
                        </div>

                        <nav className="flex items-center space-x-4">
                            {auth.user && (
                                <Link
                                    href={route("dashboard")}
                                    className="rounded-lg px-5 py-2.5 text-sm font-medium text-white bg-white/10 backdrop-blur-sm border border-white/20 transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                                >
                                    Dashboard
                                </Link>
                            )}
                        </nav>
                    </div>
                </header>

                <main className="relative z-10 flex-1 flex items-center justify-center">
                    <div className="text-center text-white px-6 py-8 sm:px-12">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
                            Solusi POS Terbaik untuk Bisnis Kopi Anda
                        </h1>
                        <p className="text-base sm:text-lg mb-10 max-w-3xl mx-auto text-gray-200">
                            Kelola penjualan, stok, dan pelanggan Anda dengan
                            mudah dan cepat menggunakan Amma Coffee.
                        </p>
                        {auth.user ? (
                            <Link
                                href={route("dashboard")}
                                className="inline-block rounded-lg bg-amber-600 px-8 py-4 text-base font-semibold text-white shadow-xl transition hover:bg-amber-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                            >
                                Buka Dashboard
                            </Link>
                        ) : (
                            <div className="space-x-4">
                                <Link
                                    href={route("register")}
                                    className="inline-block rounded-lg bg-amber-600 px-8 py-4 text-base font-semibold text-white shadow-xl transition hover:bg-amber-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                                >
                                    Daftar
                                </Link>
                                <Link
                                    href={route("login")}
                                    className="inline-block rounded-lg border-2 border-white px-8 py-4 text-base font-semibold text-white transition hover:bg-white hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                                >
                                    Masuk
                                </Link>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </>
    );
}
