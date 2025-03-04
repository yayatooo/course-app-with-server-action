import { courseService } from "@/services/course-service";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Lock } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { currencyFormat } from "@/lib/currency-format";
import { paymentCourse } from "./action.payment-course";

interface Props {
  course: Awaited<ReturnType<typeof courseService.getCourseDetail>>;
  // course : Course | null
}

export function CourseDetails({ course }: Props) {
  if (!course) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center justify-center py-6">
      <div className="py-3 flex gap-6 justify-center items-center w-7/12 mx-auto">
        <Image
          src={`${process.env.R2_PUBLIC_URL}/learning-project/courses/${course.id}/${course.coverImage}`}
          alt={`${course.title} cover image`}
          width={200}
          height={100}
          className="object-cover"
          priority
        />
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-start">{course.title}</h1>
          <h3>{course.description}</h3>
          <form action={paymentCourse}>
            <input type="hidden" value={course.id} name="courseId" />
            <input type="hidden" value={course.flashSale ? course.flashSale.newAmount : course.price} name="amount" />
            <Button className="bg-greenPrimary text-blackText hover:bg-greenHover">
              Buy{" "}
              {currencyFormat(
                course.flashSale ? course.flashSale.newAmount : course.price
              )}
            </Button>
          </form>
        </div>
      </div>

      <Card className="w-6/12 overflow-hidden my-6 border shadow-sm">
        {course?.sections.map((section) => (
          <div key={section.id} className=" last:mb-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold">
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 pt-0">
              <div className="space-y-2">
                {section.lessons.map((lesson, index) => (
                  <div key={lesson.id}>
                    <div className="flex items-center justify-between rounded-md p-2 transition-colors hover:bg-muted">
                      <div className="flex items-center gap-3">
                        <div>
                          <h3 className="font-medium">{lesson.title}</h3>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                    {index < section.lessons.length - 1 && (
                      <Separator className="my-1" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </div>
        ))}
      </Card>
    </div>
  );
}
