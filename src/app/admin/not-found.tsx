import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full py-20">
      <h2 className="text-2xl font-bold text-green-500 mb-3">
        404 - Page Not Found
      </h2>
      <p className="text-gray-400 mb-6">
        The admin page you're looking for doesn't exist.
      </p>
      <Link
        href="/admin"
        className="bg-green-500 hover:bg-green-600 text-black py-2 px-4 rounded-md transition-colors"
      >
        Return to Admin Dashboard
      </Link>
    </div>
  );
}
