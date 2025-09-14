
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <p className="text-3xl font-bold mb-6">Bicode</p>
      <div className="space-x-4">
        <a
          href="/register"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Register
        </a>
        <a
          href="/login"
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Login
        </a>
      </div>
    </main>
  );
}
