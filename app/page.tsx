import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="text-center sm:text-left">
          <h1 className="text-4xl sm:text-6xl font-bold mb-4">
            Next.js Build Plate
          </h1>
          <p
            className="text-lg sm:text-xl mb-8 max-w-2xl"
            style={{ color: "var(--foreground)" }}
          >
            A modern, production-ready Next.js boilerplate with authentication,
            Supabase integration, and everything you need to build fast,
            scalable web applications.
          </p>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://theodufort.com/next-build-plate/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/file.svg"
              alt="Documentation icon"
              width={20}
              height={20}
            />
            View Documentation
          </a>
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://github.com/your-username/next-build-plate"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/globe.svg"
              alt="GitHub icon"
              width={20}
              height={20}
            />
            View on GitHub
          </a>
        </div>

        <div className="mt-8 text-center sm:text-left">
          <h2 className="text-2xl font-semibold mb-4">Features</h2>
          <ul className="space-y-2" style={{ color: "var(--foreground)" }}>
            <li className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: "var(--success, #22c55e)" }}
              ></span>
              Next.js 15 with App Router
            </li>
            <li className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: "var(--success, #22c55e)" }}
              ></span>
              Supabase Authentication
            </li>
            <li className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: "var(--success, #22c55e)" }}
              ></span>
              TypeScript Support
            </li>
            <li className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: "var(--success, #22c55e)" }}
              ></span>
              Tailwind CSS Styling
            </li>
            <li className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: "var(--success, #22c55e)" }}
              ></span>
              Dark Mode Support
            </li>
          </ul>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://theodufort.com/next-build-plate/docs"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="Documentation icon"
            width={16}
            height={16}
          />
          Documentation
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/next.svg"
            alt="Next.js logo"
            width={16}
            height={16}
          />
          Next.js
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://supabase.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Supabase icon"
            width={16}
            height={16}
          />
          Supabase
        </a>
      </footer>
    </div>
  );
}
