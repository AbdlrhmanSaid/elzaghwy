import { Suspense } from "react";
import CartClient from "./CartClient";

export default function Page() {
  return (
    <Suspense
      fallback={<div className="p-10 text-center">Loading cart...</div>}
    >
      <CartClient />
    </Suspense>
  );
}
