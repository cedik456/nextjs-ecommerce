"use client";

import React, { useState } from "react";
import Stripe from "stripe";
import ProductCard from "./product-card";

interface Props {
  products: Stripe.Product[];
}

export default function ProductList({ products }: Props) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filterProduct = products.filter((product) => {
    const term = searchTerm.toLowerCase();
    const nameMatch = product.name.toLowerCase().includes(term);
    const descriptionMatch = product.description
      ? product.description.toLowerCase().includes(term)
      : false;

    return nameMatch || descriptionMatch;
  });

  return (
    <>
      <div className="mb-6 flex justify-center">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          placeholder="Search a product..."
          className="w-full  max-w-md rounded-md border border-gray-300 px-4 py-2 focus:outline-none"
        />
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {filterProduct.map((product, key) => {
          return (
            <li key={key}>
              <ProductCard product={product} />
            </li>
          );
        })}
      </ul>
    </>
  );
}
