import Link from "next/link";
import Image from "next/image";
import { ELibSyncLogo } from "@/components/ui/e-libsync-logo";
import Nav from "@/components/ui/nav";
import { ProfileButton } from "@/components/ui/profile-button";
import Title from "@/components/ui/title";
import { RiArrowDownSLine, RiNotification4Line } from "@remixicon/react";

export default function Layout(props: {
  modal: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="flex w-full items-center justify-between bg-tremor-background dark:bg-dark-tremor-background px-6 py-2 sticky top-0 z-10">
        <Link className="flex items-center justify-center" href="/dashboard">
          <ELibSyncLogo
            firsTwColor="text-tremor-content-strong dark:text-dark-tremor-content-strong"
            secondTwColor="text-red-500"
          />
        </Link>
        <Nav />
        <span className="flex gap-6">
          <Link href="/notifications" className="flex">
            <RiNotification4Line className="w-8 text-tremor-content-strong dark:text-dark-tremor-content-strong" />
          </Link>
          <ProfileButton>
            <span className="flex gap-6">
              <Image
                className="select-none"
                src="/profile-pic.png"
                alt="profile-pic"
                width={50}
                height={50}
              />
              <div className="text-tremor-content-strong dark:text-dark-tremor-content-strong select-none">
                <p className="text-xl font-semibold">John Doe</p>
                <span className="flex justify-between">
                  <p className="text-sm text-tremor-content dark:text-dark-tremor-content">
                    Librarian
                  </p>
                  <RiArrowDownSLine className="w-4" />
                </span>
              </div>
            </span>
          </ProfileButton>
        </span>
      </header>
      <main className="flex flex-col gap-6 p-6 flex-grow overflow-y-auto">
        <Title />
        {props.modal}
        <div>{props.children}</div>
      </main>
    </>
  );
}
