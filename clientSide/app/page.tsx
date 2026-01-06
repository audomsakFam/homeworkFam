import Link from "next/link";
export default async function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <div className="flex gap-4">
        {" "}
        <Link
          href="/pages/calculate"
          className="mx-1 rounded-full bg-white/80 px-5 py-2 text-sm font-semibold text-gray-800 backdrop-blur-sm transition-all hover:bg-white hover:shadow-md"
        >
          Calculate
        </Link>
        <Link
          href="/pages/hero"
          className="mx-1 rounded-full bg-white/80 px-5 py-2 text-sm font-semibold text-gray-800 backdrop-blur-sm transition-all hover:bg-white hover:shadow-md"
        >
          Hero
        </Link>
      </div>
    </div>
  );
}
