import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { courseService } from "@/services/course-service";
import { Send } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import { AddSection } from "./comp-add-section";
import { ComponentSectionCard } from "./comp-section-card";
import { ComponentSectionDnd } from "./comp-section-dnd";

// if we acces params.slug with syncrous way we must use Promise and make await at variable
interface Props {
  params: Promise<{ slug: string }>;
}

export default async function page({ params }: Props) {
  // Like this
  const { slug } = await params;

  const course = await courseService.getCourseDetail(slug);
  if (!course) {
    redirect("/admin/courses");
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{course.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">{course.description}</p>
          <Button className="w-full sm:w-auto bg-greenPrimary hover:bg-greenHover text-black">
            <Send className="mr-2 h-4 w-4" /> Publish Course
          </Button>
        </CardContent>
      </Card>

      <Separator className="my-8" />

      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Course Sections</h2>
        <AddSection courseId={course.id} />
      </section>
      <ComponentSectionDnd course={course} />
    </main>
  );
}
