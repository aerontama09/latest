"use client";

import clsx from "clsx";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@tremor/react";
import { useRouter } from "next/navigation";
import { RiLogoutCircleLine } from "@remixicon/react";

export function ProfileButton({ children }: { children: React.ReactNode }) {
  const [hidden, setHidden] = useState(true);
  const wrapper = useRef(null);
  const router = useRouter();

  const onDismiss = () => {
    setHidden(true);
  };

  const onSignOut = () => {
    console.log("signing out");

    router.push("/");
  };

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    },
    [onDismiss]
  );

  const onClick = useCallback(
    (e: MouseEvent) => {
      if (e.target !== wrapper.current) {
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss, wrapper]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("click", onClick);
    };
  }, [onKeyDown, onClick]);

  return (
    <div
      className="relative cursor-pointer"
      onClick={() => setHidden(!hidden)}
      ref={wrapper}
    >
      {children}
      <div
        className={clsx(
          "absolute right-0 z-10 mt-2 flex w-full flex-col rounded-md bg-tremor-background dark:bg-dark-tremor-background-subtle p-2",
          {
            hidden: hidden,
          },
          {
            block: !hidden,
          }
        )}
      >
        <Button
          className="bg-transparent justify-normal dark:bg-transparent border-transparent dark:border-transparent hover:border-transparent hover:dark:border-transparent hover:bg-tremor-background-muted hover:dark:bg-dark-tremor-background-muted"
          onClick={onSignOut}
        >
          <div className="flex gap-3">
            <RiLogoutCircleLine className="w-5 text-tremor-content-strong dark:text-dark-tremor-content-strong" />
            <p className="whitespace-nowrap text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Sign-out
            </p>
          </div>
        </Button>
      </div>
    </div>
  );
}
