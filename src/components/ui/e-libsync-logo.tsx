import { poppins } from "./fonts";

type LogoProps = {
  firsTwColor: string;
  secondTwColor: string;
};

export function ELibSyncLogo({ firsTwColor, secondTwColor }: LogoProps) {
  return (
    <div
      className={`${poppins.className} flex flex-row items-center leading-none`}
    >
      <p className={`text-[35px] font-bold ${firsTwColor} whitespace-nowrap`}>
        e-Lib
      </p>
      <p className={`text-[35px] font-bold ${secondTwColor} whitespace-nowrap`}>
        Sync
      </p>
    </div>
  );
}
