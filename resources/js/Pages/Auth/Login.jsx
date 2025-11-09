import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Guest from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <Guest>
            <Head title="Login - Amma Coffe" />

            <div className="bg-white p-8 shadow-xl rounded-2xl">
                <div className="text-center">
                    <h2 className="mt-2 text-3xl font-bold text-gray-900">
                        Selamat Datang Kembali
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Masuk ke akun Amma Coffee Anda.
                    </p>
                </div>

                {status && (
                    <div className="mb-4 text-sm font-medium text-green-600 bg-green-50 p-3 rounded-md">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="mt-8 space-y-6">
                    <div>
                        <InputLabel htmlFor="email" value="Email" />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData("email", e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password" value="Password" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="current-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="block mt-4">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData("remember", e.target.checked)
                                }
                            />
                            <span className="ms-2 text-sm text-gray-600">
                                Ingat saya
                            </span>
                        </label>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                        {canResetPassword && (
                            <Link
                                href={route("password.request")}
                                className="text-sm text-amber-600 hover:text-amber-700 font-medium"
                            >
                                Lupa password?
                            </Link>
                        )}

                        <PrimaryButton
                            className="bg-amber-600 hover:bg-amber-700 focus:bg-amber-700"
                            disabled={processing}
                        >
                            Masuk
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </Guest>
    );
}
