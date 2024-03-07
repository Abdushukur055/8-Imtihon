"use client";
import React from "react";
import styles from "./pagination.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
const Pagination = ({ count }: { count: number | undefined }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams ? searchParams : "");
  const page = Number(params.get("page")) || 1;
  const ITEM_PER_PAGE = 2
  const hasPrev = ITEM_PER_PAGE * (page - 1) > 0
  const hasNext = ITEM_PER_PAGE * (page - 1) + ITEM_PER_PAGE < Number(count)
  const handleChange = (type: string) => {
    type === "prev"
      ? params.set("page", (page - 1).toString())
      : params.set("page", (page + 1).toString())
    replace(`${pathname}?${params}`)
    setTimeout(() => {
      window.location.reload()
    }, 300);
  };
  return (
    <div className="flex justify-between ml-[350px] p-[20px]">
      <button
        className={`text-white ${styles.button}`}
        onClick={() => handleChange("prev")}
        disabled={!hasPrev}
      >
        Previous
      </button>
      <button
        className={`text-white ${styles.button}`}
        onClick={() => handleChange("next")}
        disabled={hasNext}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;