import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 p-8">
      <h1 className="text-4xl font-bold text-blue-800 mb-8 shadow-lg bg-white p-4 rounded-md">
        AFC Repair Note
      </h1>
      <div className="space-y-4">
        <Link
          href="/record-route"
          className="w-48 text-center block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow-md transition-transform transform hover:scale-105 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          記錄行程
        </Link>
        <Link
          href="/check-route"
          className="w-48 text-center block px-6 py-3 bg-green-600 text-white rounded-lg font-semibold shadow-md transition-transform transform hover:scale-105 hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
        >
          查看行程
        </Link>
      </div>
    </div>
  );
}
