import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import React from "react";
import { addSectionAction } from "./action-add-section";

export const AddSection = ({courseId} : {courseId : string}) => {
  return (
    <form action={addSectionAction}>
      <input type="hidden" value={courseId} required name="courseId" />
      <Button className="w-full sm:w-auto bg-greenPrimary hover:bg-greenHover text-black">
        <PlusCircle className="mr-2 h-4 w-4" /> Add Section
      </Button>
    </form>
  );
};
