import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import {
    ArrowLeftIcon,
    PlusIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";

const Add = ({ gudang }) => {
    const { data, setData, post, processing, errors } = useForm({
        nama: "",
        harga: "",
        deskripsi: "",
        bahan: [{ gudang_id: "", jumlah_bahan: "" }],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("menu.store"));
    };

    const handleAddBahan = () => {
        setData("bahan", [...data.bahan, { gudang_id: "", jumlah_bahan: "" }]);
    };

    const handleRemoveBahan = (index) => {
        const newBahan = [...data.bahan];
        if (newBahan.length > 1) {
            newBahan.splice(index, 1);
            setData("bahan", newBahan);
        }
    };

    const handleChangeBahan = (index, field, value) => {
        const newBahan = [...data.bahan];
        newBahan[index][field] = value;
        setData("bahan", newBahan);
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link
                        href={route("menu.index")}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <ArrowLeftIcon className="h-5 w-5" />
                    </Link>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Tambah Menu Baru
                    </h2>
                </div>
            }
        >
            <Head title="Tambah Menu - Amma Coffe" />

            <div className="py-8">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm rounded-lg p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <InputLabel htmlFor="nama" value="Nama Menu" />
                                <TextInput
                                    id="nama"
                                    name="nama"
                                    value={data.nama}
                                    className="mt-1 block w-full"
                                    autoComplete="nama"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("nama", e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.nama}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor="harga" value="Harga" />
                                <TextInput
                                    id="harga"
                                    name="harga"
                                    type="number"
                                    value={data.harga}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("harga", e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.harga}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="deskripsi"
                                    value="Deskripsi"
                                />
                                <textarea
                                    id="deskripsi"
                                    name="deskripsi"
                                    value={data.deskripsi}
                                    onChange={(e) =>
                                        setData("deskripsi", e.target.value)
                                    }
                                    rows="4"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                                ></textarea>
                                <InputError
                                    message={errors.deskripsi}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    value="Bahan dari Gudang"
                                    className="mb-2"
                                />
                                <div className="space-y-2">
                                    {data.bahan.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center space-x-2 p-3 bg-gray-50 rounded-md"
                                        >
                                            <div className="flex-1">
                                                <select
                                                    value={item.gudang_id}
                                                    onChange={(e) =>
                                                        handleChangeBahan(
                                                            index,
                                                            "gudang_id",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                                                >
                                                    <option value="">
                                                        -- Pilih Bahan --
                                                    </option>
                                                    {gudang.map((g) => (
                                                        <option
                                                            key={g.id}
                                                            value={g.id}
                                                        >
                                                            {g.nama}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <TextInput
                                                type="number"
                                                placeholder="Jumlah"
                                                value={item.jumlah_bahan}
                                                onChange={(e) =>
                                                    handleChangeBahan(
                                                        index,
                                                        "jumlah_bahan",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-32"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleRemoveBahan(index)
                                                }
                                                className="p-2 text-red-600 hover:text-red-800 transition-colors"
                                                title="Hapus Bahan"
                                            >
                                                <TrashIcon className="h-5 w-5" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    type="button"
                                    onClick={handleAddBahan}
                                    className="mt-3 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                                >
                                    <PlusIcon className="h-4 w-4 mr-2" />
                                    Tambah Bahan Lain
                                </button>
                                <InputError
                                    message={errors.bahan}
                                    className="mt-2"
                                />
                            </div>

                            <div className="flex justify-end space-x-3 pt-4">
                                <Link
                                    href={route("menu.index")}
                                    className="inline-flex items-center px-4 py-2 bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-gray-800 uppercase tracking-widest hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition ease-in-out duration-150"
                                >
                                    Batal
                                </Link>
                                <PrimaryButton
                                    className="bg-amber-600 hover:bg-amber-700 focus:bg-amber-700"
                                    disabled={processing}
                                >
                                    {processing ? "Menyimpan..." : "Simpan"}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Add;
