import React from "react";
import { FormFlashSale } from "./comp.form-flash-sale";
import { courseService } from "@/services/course-service";

export default async function page() {
  const courses = await courseService.getAllCourse();
  if (!courses) return null;

  return (
    <main>
      <section>
        <div>Flash Sale</div>
      </section>
      <section className="max-w-xl mx-auto py-6">
        <FormFlashSale courses={courses} />
      </section>
    </main>
  );
}
