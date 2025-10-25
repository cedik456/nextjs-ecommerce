"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UseCartStore } from "@/store/cart-store";
import React from "react";
import Image from "next/image";
import { checkoutAction } from "./checkout-action";

export default function CheckoutPage() {
  const { items, addItem, removeItem } = UseCartStore();

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (total === 0 || items.length === 0) {
    return (
      <div className="flex items-center justify-center">
        <h1>Your cart is empty</h1>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-10">Checkout</h1>

      <Card className="mb-5">
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>

        <CardContent>
          <ul className="flex gap-2 flex-col mb-3">
            {items.map((item, key) => (
              <li key={key} className="flex items-center  justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    {item.imageUrl && (
                      <Image
                        alt={item.name}
                        src={item.imageUrl}
                        width={100}
                        height={100}
                      />
                    )}
                    <span>{item.name} </span>
                    <Button
                      onClick={() => removeItem(item.id)}
                      variant="outline"
                      className="cursor-pointer"
                    >
                      {" "}
                      -
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      onClick={() => addItem({ ...item, quantity: 1 })}
                      variant="outline"
                      className="cursor-pointer"
                    >
                      {" "}
                      +
                    </Button>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <span>
                    ₱
                    {((item.price * item.quantity) / 100).toLocaleString(
                      "en-PH",
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <hr className="w-auto" />

          <div className="justify-end  flex mt-6">
            Total:&nbsp;
            <span className="font-semibold">
              {(total / 100).toLocaleString("en-PH", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        </CardContent>
      </Card>

      <form action={checkoutAction} className="mx-auto justify-end flex">
        <input type="hidden" name="items" value={JSON.stringify(items)} />
        <Button className="cursor-pointer" type="submit">
          Proceed to Payment
        </Button>
      </form>
    </div>
  );
}
