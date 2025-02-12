import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { courseService } from "@/services/course-service";
import { Send } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import { AddSection } from "./comp-add-section";

// if we acces params.slug with syncrous way we must use Promise and make await at variable
interface Props {
  params: Promise<{ slug: string }>;
}

export default async function page({ params }: Props) {
  // Like this
  const { slug } = await params;

  const detailCourse = await courseService.getCourseDetail(slug);
  if (!detailCourse) {
    redirect("/admin/courses");
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            {detailCourse.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            {detailCourse.description}
          </p>
          <Button className="w-full sm:w-auto bg-greenPrimary hover:bg-greenHover text-black">
            <Send className="mr-2 h-4 w-4" /> Publish Course
          </Button>
        </CardContent>
      </Card>

      <Separator className="my-8" />

      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Course Sections</h2>
        <AddSection courseId={detailCourse.id} />
      </section>
      <section className="flex flex-col gap-2 py-6">
        {detailCourse.sections.map((section) => (
          <Card
            key={section.id}
            
            className="hover:shadow-lg transition-shadow duration-300 "
          >
            <CardHeader>
              <div className="flex justify-between items-center">
                <h1 className="text-lg">{section.title}</h1>
                <div className="flex gap-2">
                  <Button variant="secondary">Edit</Button>
                  <Button variant="destructive">Delete</Button>
                  <Button className="bg-greenPrimary hover:bg-greenHover text-black">
                    Add Lesson
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </section>
    </main>
  );
}
