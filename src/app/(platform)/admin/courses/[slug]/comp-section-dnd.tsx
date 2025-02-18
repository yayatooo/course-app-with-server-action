"use client";

import { courseService } from "@/services/course-service";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { ComponentSectionCard } from "./comp-section-card";
import { updateSectionIndexAction } from "./action-update-section-index";
import { startTransition, useOptimistic } from "react";

interface PropsCourse {
  course: Awaited<ReturnType<typeof courseService.getCourseDetail>>;
}

export const ComponentSectionDnd = ({ course }: PropsCourse) => {
  const [optimisticState, useOptimisticState] = useOptimistic(course?.sections);

  if (!course || course.sections.length === 0) return null;

  const { sections } = course;

  async function handleDragEnd(result: DropResult) {
    if (!result.destination) return;
    if (!course?.sections) return;

    const soureIndex = result.source.index;
    const destinationIndex = result.destination.index;

    // console.log(soureIndex, destinationIndex);

    const newSections = [...course.sections];
    const [movedSection] = newSections.splice(soureIndex, 1);
    newSections.splice(destinationIndex, 0, movedSection);

    // update from client
    const recorderedSections = newSections.map((section, index) => ({
      ...section,
      index: index,
    }));
    startTransition(() => {

      useOptimisticState(recorderedSections);
    })

    // update from server
    // console.log(recorderedSections);
    const formData = new FormData();
    formData.append("sourceIndex", soureIndex.toString());
    formData.append("destinationIndex", destinationIndex.toString());
    formData.append("courseId", course.id);

    await updateSectionIndexAction(formData);
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="sections">
        {(provided) => (
          <section
            className="flex flex-col gap-2 py-6"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {optimisticState?.map((section, index) => (
              <ComponentSectionCard
                key={section.id}
                section={section}
                index={index}
              />
            ))}
            {provided.placeholder}
          </section>
        )}
      </Droppable>
    </DragDropContext>
  );
};
