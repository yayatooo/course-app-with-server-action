import { Button } from "@/components/ui/button";
import { Lesson } from "@prisma/client";
import { GripVertical } from "lucide-react";
import React from "react";
import { actionDeleteLesson } from "./action-delete-lesson";
import { CompinentEditSection } from "./comp-edit-section";

interface PropsLesson {
  lesson: Lesson;
}

export const ComponentLessonCard = ({ lesson }: PropsLesson) => {
  return (
    <div className="bg-[#afe9c0] flex justify-between items-center rounded-md py-1 px-3 border-2 border-greenHover">
      <h1 className="text-md flex items-center" key={lesson.id}>
        <span>
          <GripVertical size={15} />
        </span>{" "}
        {lesson.title}
      </h1>

      <div className="flex gap-2">
        <CompinentEditSection lesson={lesson} />
        <form action={actionDeleteLesson}>
          <input type="hidden" name="lessonId" value={lesson.id} />
          <Button size="sm" variant="destructive">
            Delete
          </Button>
        </form>
      </div>
    </div>
  );
};
