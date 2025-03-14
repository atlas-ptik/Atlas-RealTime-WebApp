import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050816] flex flex-col items-center justify-center p-4">
      {/* Background pattern */}
      <div className="fixed inset-0 overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute right-0 w-full h-full">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-green-500/10 to-transparent transform rotate-45"></div>
          <div className="absolute top-0 right-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiMwMGZmMDAiLz48L3N2Zz4=')]"></div>
        </div>
      </div>

      <div className="relative z-10 text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <div className="h-1 w-32 bg-gradient-to-r from-green-400 to-green-600 mx-auto mb-6"></div>
        <h2 className="text-2xl font-semibold text-white mb-3">
          Page Not Found
        </h2>
        <p className="text-gray-400 mb-8 max-w-md">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-black font-medium py-2 px-6 rounded-full transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
