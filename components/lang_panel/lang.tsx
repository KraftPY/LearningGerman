"use client";

import Image from "next/image";
import { useStore } from "@/store";
import { observer } from "mobx-react-lite";

export default observer(function Lang() {
  const {
    lang: { lang, setLang }
  } = useStore();

  const changeLang = (): void => {
    lang === "de" ? setLang("ru") : setLang("de");
  };

  const getFlag = (pos: 1 | 2): string => {
    return (lang === "de" && pos === 1) || (lang === "ru" && pos === 2)
      ? "germany"
      : "russia";
  };

  return (
    <div
      className="flex flex-row items-center h-full gap-1 cursor-pointer"
      onClick={() => changeLang()}
    >
      <Image
        src={`/flags/${getFlag(1)}.png`}
        alt={getFlag(1)}
        width={30}
        height={30}
      />
      <Image src="/right-arrow.png" alt="right-arrow" width={12} height={12} />
      <Image
        src={`/flags/${getFlag(2)}.png`}
        alt={getFlag(2)}
        width={30}
        height={30}
      />
    </div>
  );
});
