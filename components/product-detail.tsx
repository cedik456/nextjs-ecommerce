"use client";

import Image from "next/image";
import React from "react";
import Stripe from "stripe";
import { Button } from "./ui/button";
import { UseCartStore } from "@/store/cart-store";

interface Props {
  product: Stripe.Product;
}

export default function ProductDetail({ product }: Props) {
  const { items, addItem, removeItem } = UseCartStore();
  const price = product.default_price as Stripe.Price;
  const cartItem = items.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const onAddItem = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: price.unit_amount as number,
      imageUrl: product.images ? product.images[0] : null,
      quantity: 1,
    });
  };

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 items-center justify-items-center">
      {product.images && product.images[0] && (
        <Image
          alt={product.name}
          src={product.images[0]}
          width={499}
          height={500}
          className=" transition-opacity duration-500 ease-in-out  "
        />
      )}

      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">{product.name}</h1>

        {product.description && (
          <div className="text-gray-600 text-lg"> {product.description} </div>
        )}

        {price && price.unit_amount && (
          <p className="text-lg font-bold">
            {new Intl.NumberFormat("en-PH", {
              style: "currency",
              currency: "PHP",
            }).format(price.unit_amount / 100)}
          </p>
        )}

        <div className="flex gap-3 items-center">
          <Button
            onClick={() => removeItem(product.id)}
            variant="outline"
            className="cursor-pointer"
          >
            {" "}
            -
          </Button>
          <span>{quantity}</span>
          <Button
            onClick={onAddItem}
            variant="outline"
            className="cursor-pointer"
          >
            {" "}
            +
          </Button>
        </div>
      </div>
    </div>
  );
}
