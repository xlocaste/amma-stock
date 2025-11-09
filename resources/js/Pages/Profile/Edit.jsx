import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <UserCircleIcon className="h-8 w-8 text-amber-600" />
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Profil Saya
                    </h2>
                </div>
            }
        >
            <Head title="Profil - Amma Coffe" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm rounded-lg p-6">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="bg-white shadow-sm rounded-lg p-6">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="bg-white shadow-sm rounded-lg p-6">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
