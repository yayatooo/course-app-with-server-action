import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import { AddLessonBtn } from "./comp-add-lesson-btn";
import { Lesson, Section } from "@prisma/client";
import { GripVertical } from "lucide-react";
import { ComponentLessonCard } from "./comp-lesson-card";
import { deleteSectionAction } from "./action-delete.section";
import { CompinentEditSection } from "./comp-edit-section";
import { Draggable } from "@hello-pangea/dnd";

interface PropsSection {
  section: Section & { lessons: Lesson[] };
  index: number
}

export const ComponentSectionCard = ({ section, index }: PropsSection) => {
  return (
    <Draggable draggableId={section.id} index={index}>
      {(DraggableProvider)=>{
        return (
          <Card
          key={section.id}
          className="hover:shadow-lg transition-shadow duration-300 "
          ref={DraggableProvider.innerRef} {...DraggableProvider.draggableProps}
        >
          <CardHeader>
            <div className="flex justify-between items-center">
              <h1 className="text-lg flex items-center">
                <span {...DraggableProvider.dragHandleProps}>
                  <GripVertical size={20} />
                </span>
                {section.title}
              </h1>
              <div className="flex gap-2">
                <CompinentEditSection section={section} />
                <form action={deleteSectionAction}>
                  <input type="hidden" name="sectionId" value={section.id} />
                  <Button
                    variant="destructive"
                    disabled={section.lessons.length > 0} // add condition if the section have a lesson the section can't delete
                  >
                    Delete
                  </Button>
                </form>
                <AddLessonBtn sectionId={section.id} />
              </div>
            </div>
          </CardHeader>
          <CardContent className="bg-slate-100 py-6">
            <div className="space-y-2">
              {section.lessons.length === 0 ? (
                <p className="text-gray-500 text-center">Add your lesson</p>
              ) : (
                section.lessons.map((lesson) => (
                  <ComponentLessonCard key={lesson.id} lesson={lesson} />
                ))
              )}
            </div>
          </CardContent>
        </Card>
        )
      }}

    
    </Draggable>
  );
};
