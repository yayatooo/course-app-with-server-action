import { Navmenu } from "@/utils/data";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

export const Navbar = () => {
  return (
    <section className="max-w-7xl mx-auto p-4 flex justify-between items-center">
      <Link href="/" className="font-semibold text-xl">Navbar</Link>
      <div className="flex gap-x-5 font-light text-sm bg-[#ebedec] py-2 px-3 rounded-full">
        {Navmenu.map((item, index) => {
          return (
            <Link key={index} href={item.url}>
              {item.name}
            </Link>
          );
        })}
      </div>
      <div className="space-x-2">
        <Link href="/register">
          <Button className="rounded-full bg-greenPrimary hover:bg-greenHover text-black" size="sm">
            Sign in
          </Button>
        </Link>
        <Link href="login">
          <Button
            className="rounded-full border-greenPrimary text-greenPrimary hover:bg-greenPrimary" size="sm"
            variant="outline"
          >
            Login
          </Button>
        </Link>
      </div>
    </section>
  );
};
