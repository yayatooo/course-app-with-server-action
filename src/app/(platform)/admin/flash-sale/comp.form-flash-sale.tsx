"use client"

import React, { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Course } from "@prisma/client";
import { addFlashSaleAction } from "./action.add-flash-sale";

interface PropsFlashSale {
    courses: Course[];
}

export const FormFlashSale = ({courses} : PropsFlashSale) => {


const [_, formAction, pending] = useActionState(addFlashSaleAction, null)

  return (
    <form action={formAction} className="space-y-3">
      <h1>Input a discount</h1>
      <Input type="number" placeholder="Input discount value" name="amount" />
      <div className="flex justify-between ">
        <Select name="courseId">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a Course" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Course</SelectLabel>
              {courses?.map((course) => {
                return (
                  <SelectItem value={course.id} key={course.id}>
                    {course.title}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button className="bg-greenPrimary text-black" disabled={pending}>submit</Button>
      </div>
    </form>
  );
};
