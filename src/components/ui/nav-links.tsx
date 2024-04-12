"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { RiBook2Line, RiDashboardLine, RiGroupLine, RiRestartLine, RiRobot2Fill, RiRobot2Line } from "@remixicon/react";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: RiDashboardLine,
  },
  {
    name: "Books",
    href: "/books",
    icon: RiBook2Line,
  },
  {
    name: "Patrons",
    href: "/patrons",
    icon: RiGroupLine,
  },
  {
    name: "Circulation",
    href: "/circulation",
    icon: RiRestartLine,
  },
  {
    name: "LINAR",
    href: "/linar",
    icon: RiRobot2Line,
  },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 p-3 text-sm font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong md:flex-none md:justify-start md:p-2 md:px-3",
              {
                " border-b-4 border-b-tremor-border dark:border-b-dark-tremor-border":
                  pathname === link.href,
              },
              {
                "hover:bg-tremor-background-muted active:bg-tremor-background-subtle hover:dark:bg-dark-tremor-background-muted active:dark:bg-dark-tremor-background-subtle ":
                  pathname !== link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
