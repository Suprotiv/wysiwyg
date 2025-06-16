// /app/search/page.tsx or /pages/search.tsx (depending on your setup)
"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const SearchPage = dynamic(() => import("../components/SearchPage"), {
  ssr: false,
});

export default function SearchWrapper() {
  return (
    <Suspense
      fallback={<div className="text-white p-10">Loading search...</div>}
    >
      <SearchPage />
    </Suspense>
  );
}
