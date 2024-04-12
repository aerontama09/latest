"use client";

import { usePathname } from "next/navigation";
import { SearchSelect, SearchSelectItem, SelectItem } from "@tremor/react";
import { useEffect, useState } from "react";

const titles = [
  {
    title: "Dashboard",
    pathname: "/dashboard",
  },
  {
    title: "Books",
    pathname: "/books",
  },
  {
    title: "Patrons",
    pathname: "/patrons",
  },
  {
    title: "Circulation",
    pathname: "/circulation",
  },
  {
    title: "LINAR",
    pathname: "/linar",
  },
];

export default function Title() {
  const pathname = usePathname();
  const [searchVal, setSearchVal] = useState("");

  const handleSearchValueChange = (val: string) => {
    setSearchVal(val);
  };

  return (
    <div className="flex items-center justify-between gap-6">
      <h1 className="text-3xl font-bold text-tremor-content-strong dark:text-dark-tremor-content-strong">
        {titles.find((title) => title.pathname === pathname)?.title}
      </h1>
      <div className="w-1/4">
        <SearchSelect
          searchValue={searchVal}
          onSearchValueChange={handleSearchValueChange}
          enableClear={true}
          placeholder="Search..."
        >
          <SearchSelectItem value="Option 1">Option 1</SearchSelectItem>
          <SearchSelectItem value="Option 2">Option 2</SearchSelectItem>
          <SearchSelectItem value="Option 3">Option 3</SearchSelectItem>
          <SearchSelectItem value="Option 4">Option 4</SearchSelectItem>
          <SearchSelectItem value="Option 5">Option 5</SearchSelectItem>
        </SearchSelect>
      </div>
    </div>
  );
}
