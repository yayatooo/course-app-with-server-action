import * as React from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { courseService } from "@/services/course-service";
import Image from "next/image";
import Link from "next/link";
import { currencyFormat } from "@/lib/currency-format";
import { Tag } from "lucide-react";
import { Badge } from "../ui/badge";

export async function CarouselSlider() {
  const courses = await courseService.getAllCourse();

  return (
    <Carousel className="w-full max-w-lg">
      <CarouselContent>
        {courses?.map((course) => (
          <CarouselItem key={course.id}>
            <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-xl">
              {/* Course Cover Image */}
              <div className="relative h-48 w-full">
                <Image
                  src={`${process.env.R2_PUBLIC_URL}/learning-project/courses/${course.id}/${course.coverImage}`}
                  alt={course.title}
                  fill
                  className="object-cover"
                />

                {/* Flash Sale Badge */}
                {course.flashSale?.id && (
                  <div className="absolute top-0 right-0 m-2">
                    <Badge className="bg-red-500 hover:bg-red-600 flex items-center gap-1 px-2 py-1">
                      <Tag className="h-3.5 w-3.5" />
                      <span>Flash Sale!</span>
                    </Badge>
                  </div>
                )}
              </div>

              {/* Course Details */}
              <CardHeader className="p-4 pb-2">
                <h3 className="text-xl font-semibold line-clamp-2">
                  {course.title}
                </h3>
              </CardHeader>

              <CardContent className="p-4 pt-0">
                <div className="flex items-baseline gap-2 mb-2">
                  {course.flashSale?.id ? (
                    <>
                      <span className="text-lg font-bold text-primary">
                        {currencyFormat(course.flashSale.newAmount)}
                      </span>
                      <span className="text-sm text-muted-foreground line-through">
                        {currencyFormat(course.price)}
                      </span>
                    </>
                  ) : (
                    <span className="text-lg font-bold text-primary">
                      {currencyFormat(course.price)}
                    </span>
                  )}
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0">
                <div className="flex gap-3 w-full">
                  <Link
                    href={`/register`}
                    className="flex-1 inline-flex justify-center items-center h-9 rounded-md bg-greenPrimary text-blackText hover:bg-greenHover px-4 py-2 text-sm font-medium transition-colors"
                  >
                    Buy Now
                  </Link>
                  <Link
                    href={`/${course.slug}`}
                    className="flex-1 inline-flex justify-center items-center h-9 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 px-4 py-2 text-sm font-medium transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
