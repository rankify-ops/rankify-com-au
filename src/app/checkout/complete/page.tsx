import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { ContactFooter } from "@/components/sections/ContactFooter";
import { CheckoutResult } from "@/components/service-page/CheckoutResult";

export const metadata: Metadata = {
  title: "Order complete | Rankify",
  description: "Your website build order.",
  robots: { index: false, follow: false },
};

export default function CheckoutCompletePage() {
  return (
    <>
      <Header />
      <main className="mx-2 mt-2 rounded-3xl bg-paper text-ink">
        <div className="mx-auto flex min-h-[60vh] max-w-[760px] flex-col justify-center px-5 py-20 sm:px-10">
          <CheckoutResult />
        </div>
      </main>
      <ContactFooter />
    </>
  );
}
