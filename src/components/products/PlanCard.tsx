import Link from "next/link";
import { useAtom } from "jotai";
import { favouriteItemAtom } from "@/atom/favouriteItem";
import { useState } from "react";
import { getSlug } from "@/utils/slugify";

export default function PlanCard({ items }) {
  const [isHover, setIsHover] = useState(false);

  return (
    <Link href={`/products/${getSlug(items.id, items.country)}`} className="z-[20]">
      <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="group rounded-lg bg-white dark:bg-slate-900
         hover:translate-x-[-2px] hover:translate-y-[-2px]
         border border-gray-200
         shadow hover:shadow-xl dark:hover:shadow-2xl dark:shadow-gray-800
         dark:hover:shadow-gray-700 overflow-hidden ease-in-out duration-500 relative"
      >
        <div className="relative">
          <img
            src="https://cdn.shopify.com/s/files/1/0023/8403/5875/products/sights-cover.jpg"
            alt="image"
            className="object-fill h-[222px] w-full"
          />
        </div>

        <div className="p-3">
          <div className="pb-3">
            <div className="text-lg text-start btn btn-link hover:text-indigo-600 after:bg-indigo-600 duration-500 ease-in-out text-xl line-clamp-1">
              {items.name}
            </div>
          </div>

          <ul className="py-3 border-y border-gray-100 dark:border-gray-800 grid grid-cols-2 flex items-center list-none text-gray-500">
            <li className="flex items-center col-span-2 mr-4">
              <i className={"mdi mdi-earth text-2xl mr-2 "}></i>
              <div className="line-clamp-1">{items.country}</div>
            </li>
          </ul>

          <ul className="pt-3 flex justify-between items-center list-none relative">
            <li>
              <span className="text-gray-400">from</span>
              <p className="text-xl font-bold">
                {items.currency} {items.price}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </Link>
  );
}
