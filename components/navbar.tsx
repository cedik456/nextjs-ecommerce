"use client";

import { UseCartStore } from "@/store/cart-store";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const { items } = UseCartStore();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white ">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href={"/"} className="hover:text-blue-600">
          My Bikes
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link href={"/"} className="hover:text-blue-600">
            Home
          </Link>
          <Link href={"/products"} className="hover:text-blue-600">
            Products
          </Link>
          <Link href={"/checkout"} className="hover:text-blue-600">
            Checkout
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Link href={"/checkout"} className="relative">
            <ShoppingCartIcon className="h-6 w-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 text-xs items-center justify-center shadow-md rounded-full bg-red-500 text-white">
                {cartCount}
              </span>
            )}
          </Link>
          <Button
            variant="ghost"
            className="md:hidden cursor-pointer"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? <XMarkIcon /> : <Bars3Icon />}
          </Button>
        </div>
        {mobileOpen && (
          <nav className="bg-white shadow-md px-4 py-2 absolute left-0 top-full w-full">
            <ul>
              <li>
                <Link href={"/"}>Home</Link>
              </li>
              <li>
                <Link href={"/products"}>Products</Link>
              </li>
              <li>
                <Link href={"/checkout"}>Checkout</Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </nav>
  );
}
