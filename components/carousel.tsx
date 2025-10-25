"use client";

import Stripe from "stripe";
import { Card, CardContent, CardTitle } from "./ui/card";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Props {
  products: Stripe.Product[];
}

export default function Carousel({ products }: Props) {
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [products.length]);

  const currentProduct = products[current];

  const price = currentProduct.default_price as Stripe.Price;

  return (
    <Card className="relative overflow-hidden  rounded-lg shadow-md  ">
      <div className="grid grid-cols-1 items-center container px-10  h-52 md:grid-cols-2 md:p-10 gap-6 ">
        {currentProduct.images && currentProduct.images[0] && (
          <Image
            alt={currentProduct.name}
            src={currentProduct.images[0]}
            width={200}
            height={200}
            className="transition-opacity duration-500 ease-in-out  w-40 sm:w-56 md:w-64 h-auto "
          />
        )}
        <CardContent className=" text-center md:text-left ">
          <CardTitle className="text-3xl font-bold  mb-2">
            {currentProduct.name}
          </CardTitle>
          {price && price.unit_amount && (
            <p className=" text-xl">
              {new Intl.NumberFormat("en-PH", {
                style: "currency",
                currency: "PHP",
              }).format(price.unit_amount / 100)}
            </p>
          )}
        </CardContent>
      </div>
    </Card>
  );
}
