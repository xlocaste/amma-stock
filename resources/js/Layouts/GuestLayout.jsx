import { Link } from "@inertiajs/react";

export default function Guest({ children }) {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex-shrink-0 flex items-center">
                            <Link
                                href="/"
                                className="text-2xl font-bold text-amber-600"
                            >
                                Amma Coffee
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md">{children}</div>
            </main>
        </div>
    );
}
