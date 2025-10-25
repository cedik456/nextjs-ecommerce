import React from "react";
import Stripe from "stripe";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";

interface Props {
  product: Stripe.Product;
}

export default function ProductCard({ product }: Props) {
  const price = product.default_price as Stripe.Price;

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="md:h-[350px] h-auto flex justify-between ">
        {product.images && product.images[0] && (
          <Image
            alt={product.name}
            src={product.images[0]}
            width={200}
            height={200}
            className="pl-2 transition-opacity duration-500 ease-in-out "
          />
        )}

        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
        </CardHeader>

        <CardContent>
          {product.description && (
            <p className="text-gray-600 text-sm mb-2">{product.description}</p>
          )}

          {price && price.unit_amount && (
            <p className=" text-xl">
              {new Intl.NumberFormat("en-PH", {
                style: "currency",
                currency: "PHP",
              }).format(price.unit_amount / 100)}
            </p>
          )}

          <Button className="w-1/2 cursor-pointer mt-4">View Details</Button>
        </CardContent>
      </Card>
    </Link>
  );
}
