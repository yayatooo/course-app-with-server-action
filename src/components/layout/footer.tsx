import { Navmenu } from "@/utils/data";
import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <section className="bg-[#4d5251] text-[#f7f7f6] p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-semibold text-xl pb-4">Footer</h1>
        <div className="flex flex-col font-extralight text-sm space-y-1">
          {Navmenu.map((item, index) => {
            return (
              <Link key={index} href={item.url}>
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
      
    </section>
  );
};
