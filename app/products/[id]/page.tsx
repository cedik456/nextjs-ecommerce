import ProductDetail from "@/components/product-detail";
import { stripe } from "@/lib/stripe";
import React from "react";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await stripe.products.retrieve(params.id, {
    expand: ["default_price"],
  });

  const plainProduct = JSON.parse(JSON.stringify(product));

  return (
    <main className="mt-20">
      <ProductDetail product={plainProduct} />
    </main>
  );
}
