import React from "react";
import { FormFlashSale } from "./comp.form-flash-sale";
import { courseService } from "@/services/course-service";
import { flashSaleService } from "@/services/flash-sale-service";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { currencyFormat } from "@/lib/currency-format";
import { DeleteFlashSaleComponents } from "./comp.delete-flash-sale";
import { deleteFlashSaleAction } from "./action.delete-flash-sale";

export default async function page() {
  const courses = await courseService.getAllCourse();
  if (!courses) return null;

  const flashSale = await flashSaleService.getAllFlashSale();

  return (
    <main>
      <section>
        <h1>Flash Sale</h1>
      </section>
      <section className="max-w-xl mx-auto py-6">
        <FormFlashSale courses={courses} />
      </section>
      <section className="max-w-xl mx-auto py-6">
        <div className="py-6">
          <h1>Flash Sale List</h1>
        </div>
        <div className="space-y-6">
          {flashSale.map((sale) => {
            return (
              <Card
                key={sale.id}
                className="flex shadow-lg hover:shadow-xl transition-shadow duration-200"
              >
                <Image
                  width={160}
                  height={100}
                  src={`${process.env.R2_PUBLIC_URL}/learning-project/courses/${sale.course.id}/${sale.course.coverImage}`}
                  alt={sale.course.title}
                  className="object-cover rounded-md"
                />
                <div className="p-4">
                  <div className="text-xl font-semibold text-gray-800 mb-2">
                    {sale.course.title}
                  </div>
                  <div className="text-green-600 mb-4 line-clamp-2 flex justify-between items-center">
                    <h3>-{currencyFormat(sale.newAmount)}</h3>
                  </div>
                  <DeleteFlashSaleComponents flashSale={sale} />
                </div>
              </Card>
            );
          })}
        </div>
      </section>
    </main>
  );
}
