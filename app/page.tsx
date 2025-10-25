import Carousel from "@/components/carousel";
import { Button } from "@/components/ui/button";
import { stripe } from "@/lib/stripe";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 5,
  });
  console.log(products);

  return (
    <div>
      <section className="rounded-sm border  py-8 sm:py-12">
        <div className="mx-auto grid grid-cols-1 items-center justify-items-center gap-8 px-8 sm:px-16 md:grid-cols-2">
          <Image
            alt="Banner Image"
            width={450}
            height={450}
            className="rounded-sm order-1 md:order-2"
            src={products.data[0].images[0]}
          />

          <div className="max-w-md space-y-4 order-2 md:order-1  ">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Welcome to the world of Bikes!
            </h2>
            <p className="text-neutral-600">
              Discover our latest products at the best prices.
            </p>
            <Button
              asChild
              variant="default"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-black text-white"
            >
              <Link
                href={"/products"}
                className="inline-flex items-center justify-center px-6 py-3"
              >
                Browse all products
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <section className="py-8">
        <Carousel products={products.data} />
      </section>
    </div>
  );
}
