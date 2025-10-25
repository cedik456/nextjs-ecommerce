"use client";

import { Button } from "@/components/ui/button";
import { UseCartStore } from "@/store/cart-store";
import Link from "next/link";
import React, { useEffect } from "react";

export default function page() {
  const { clearCart } = UseCartStore();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="flex items-center justify-center flex-col mt-28 gap-2">
      <h1 className="text-xl font-semibold">Payment Successful</h1>
      <p className="">
        Thank you for your purchase. Your order is being processed.
      </p>
      <Button asChild>
        <a href="/products">Continue Shopping</a>
      </Button>
    </div>
  );
}
