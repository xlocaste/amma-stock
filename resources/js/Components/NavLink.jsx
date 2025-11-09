import { Link } from "@inertiajs/react";

export default function NavLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
                active
                    ? "bg-amber-50 text-amber-700 border-r-2 border-amber-500"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            } ${className}`}
        >
            {children}
        </Link>
    );
}
