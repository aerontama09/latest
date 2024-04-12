import { ELibSyncLogo } from "@/components/ui/e-libsync-logo";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex shrink-0 items-center justify-between px-0 md:px-6">
        <Link href="/">
          <ELibSyncLogo
            firsTwColor="text-tremor-content-strong dark:text-dark-tremor-content-strong"
            secondTwColor="text-red-500"
          />
        </Link>
        <span className="flex gap-6">
          <Link
            href="/sign-up"
            className="rounded-lg border-2 border-orange-400 px-6 py-3 text-sm font-medium text-orange-400 transition-colors hover:bg-orange-50 md:text-base"
          >
            <span>Create an account</span>
          </Link>
          <Link
            href="/sign-in"
            className="rounded-lg border-2 border-red-600 bg-red-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-red-500 md:text-base"
          >
            <span>Sign-in</span>
          </Link>
        </span>
      </div>
      <div className="mt-4 flex grow flex-col-reverse items-center justify-center gap-4 md:flex-row md:px-24">
        <div className="flex flex-col justify-center gap-6">
          <p
            className={`text-xl font-bold text-tremor-content-strong dark:text-dark-tremor-content-strong md:text-6xl md:leading-normal`}
          >
            Connect with{" "}
            <span className="text-red-500">Rodriguez Municipal Library</span>
          </p>
          <p className="text-xl text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis">
            Level up your library experience! eLibSync makes borrowing a breeze
            for patrons and keeps librarians on top of their game.
          </p>
          <Link
            href="#"
            className="flex self-start rounded-lg border-2 border-orange-400 px-6 py-3 text-sm font-medium text-orange-400 transition-colors hover:bg-orange-50 md:text-base"
          >
            <span>Learn more</span>
          </Link>
          <div className="flex justify-center">
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <span className="text-4xl font-semibold text-orange-400">
                  3000+
                </span>
                <span className="text-2xl text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis">
                  Users
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-semibold text-orange-400">
                  1000+
                </span>
                <span className="text-2xl text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis">
                  Books
                </span>
              </div>
            </div>
          </div>
        </div>
        <Image
          src="/hero-desktop.png"
          width={500}
          height={500}
          className="md:block"
          alt="Montalban e-Library Logo"
        />
      </div>
    </main>
  );
}
