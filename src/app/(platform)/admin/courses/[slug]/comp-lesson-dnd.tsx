"use client";

import { courseService } from "@/services/course-service";
import { ComponentLessonCard } from "./comp-lesson-card";
import { Lesson, Section } from "@prisma/client";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { startTransition, useOptimistic } from "react";
import { updateLessonDndAction } from "./action-update-lesson-dnd";

interface PropsLesson {
  section: Section & { lessons: Lesson[] };
}

export const ComponentLessonDnd = ({ section }: PropsLesson) => {
  const [optimisticState, useOptimisticState] = useOptimistic(section?.lessons);

  if (!section || section.lessons.length === 0) return null;

  async function handleDragEnd(result: DropResult) {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination?.index;

    // console.log(sourceIndex, destinationIndex);

    const newLessons = [...section.lessons];
    const [movedLesson] = newLessons.splice(sourceIndex, 1);
    newLessons.splice(destinationIndex, 0, movedLesson);

    const recorderedLessons = newLessons.map((lesson, index) => ({
      ...lesson,
      index: index,
    }));

    startTransition(() => {
      useOptimisticState(recorderedLessons);
    });

    const formData = new FormData();
    formData.append("sourceIndex", sourceIndex.toString());
    formData.append("destinationIndex", destinationIndex.toString())
    formData.append("sectionId", section.id)

    await updateLessonDndAction(formData)
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="lessons">
        {(provided) => (
          <div
            className="space-y-2"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {section.lessons.length === 0 ? (
              <p className="text-gray-500 text-center">Add your lesson</p>
            ) : (
              optimisticState?.map((lesson, index) => (
                <ComponentLessonCard
                  key={lesson.id}
                  lesson={lesson}
                  index={index}
                />
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
